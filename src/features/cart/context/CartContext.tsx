import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { cartService, persistGuestCart } from '@/features/cart/model/cart.service';
import { cartApi } from '@/features/cart/model/cart.api';
import { CartContextType } from '@/features/cart/model/cart.types';
import { findCartProduct, removeCartProduct, updateCartProductQuantity } from './cart.helpers';
import { toSafeString } from '../model/cart.utils';
import { CartProduct } from '@/types/product';

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthReady } = useAuth();
  const userId = user?.id ?? null;

  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const initializeCart = async () => {
      if (!isAuthReady) return;

      setIsCartLoading(true);

      try {
        if (!userId) {
          const guestItems = cartService.getGuestItems();
          const hydrated = await cartService.hydrateProducts(guestItems);

          if (!cancelled) setCartProducts(hydrated);
          return;
        }

        const mergedItems = await cartService.mergeGuestToUser(userId);
        const hydrated = await cartService.hydrateProducts(mergedItems);

        if (!cancelled) setCartProducts(hydrated);
      } finally {
        if (!cancelled) setIsCartLoading(false);
      }
    };

    initializeCart();

    return () => {
      cancelled = true;
    };
  }, [isAuthReady, userId]);

  const addProductToCart = useCallback(
    async (product: CartProduct) => {
      const size = toSafeString(product.size);
      const color = toSafeString(product.color);

      const existing = findCartProduct(cartProducts, product.id, size, color);
      const nextQty = existing ? existing.quantity + 1 : Math.max(1, product.quantity ?? 1);

      const nextState = existing
        ? updateCartProductQuantity(cartProducts, product.id, nextQty, size, color)
        : [...cartProducts, { ...product, size, color, quantity: nextQty }];

      setCartProducts(nextState);

      try {
        if (userId) {
          await cartApi.setQuantity(userId, product.id, nextQty, size, color);
        } else {
          persistGuestCart(nextState);
        }
      } catch (error) {
        console.error('addProductToCart error:', error); // Если запрос упал — ошибка логируется.
        throw error instanceof Error ? error : new Error('Failed to add product');
      }
    },
    [userId, cartProducts],
  );

  const deleteProductFromCart = useCallback(
    async (productId: number, size: string, color: string) => {
      const normalizedSize = toSafeString(size);
      const normalizedColor = toSafeString(color);

      const nextCartProducts = removeCartProduct(
        cartProducts,
        productId,
        normalizedSize,
        normalizedColor,
      );

      setCartProducts(nextCartProducts);

      try {
        if (userId) {
          await cartApi.setQuantity(userId, productId, 0, normalizedSize, normalizedColor);
        } else {
          persistGuestCart(nextCartProducts);
        }
      } catch (error) {
        console.error('deleteProductFromCart error:', error);
        throw error instanceof Error ? error : new Error('Failed to delete product');
      }
    },
    [userId, cartProducts],
  );

  const increaseQuantity = useCallback(
    async (productId: number, size: string, color: string) => {
      const normalizedSize = toSafeString(size);
      const normalizedColor = toSafeString(color);

      const existingCartItem = findCartProduct(
        cartProducts,
        productId,
        normalizedSize,
        normalizedColor,
      );

      if (!existingCartItem) return;

      const nextQuantity = existingCartItem.quantity + 1;

      const nextCartProducts = updateCartProductQuantity(
        cartProducts,
        productId,
        nextQuantity,
        normalizedSize,
        normalizedColor,
      );

      setCartProducts(nextCartProducts);

      try {
        if (userId) {
          await cartApi.setQuantity(
            userId,
            productId,
            nextQuantity,
            normalizedSize,
            normalizedColor,
          );
        } else {
          persistGuestCart(nextCartProducts);
        }
      } catch (error) {
        console.error('increaseQuantity error:', error);
        throw error instanceof Error ? error : new Error('Failed to increase quantity');
      }
    },
    [userId, cartProducts],
  );

  const decreaseQuantity = useCallback(
    async (productId: number, size: string, color: string) => {
      const normalizedSize = toSafeString(size);
      const normalizedColor = toSafeString(color);

      const existingCartItem = findCartProduct(
        cartProducts,
        productId,
        normalizedSize,
        normalizedColor,
      );

      if (!existingCartItem) return;

      const nextQuantity = Math.max(1, existingCartItem.quantity - 1);

      const nextCartProducts = updateCartProductQuantity(
        cartProducts,
        productId,
        nextQuantity,
        normalizedSize,
        normalizedColor,
      );

      setCartProducts(nextCartProducts);

      try {
        if (userId) {
          await cartApi.setQuantity(
            userId,
            productId,
            nextQuantity,
            normalizedSize,
            normalizedColor,
          );
        } else {
          persistGuestCart(nextCartProducts);
        }
      } catch (error) {
        console.error('decreaseQuantity error:', error);
        throw error instanceof Error ? error : new Error('Failed to decrease quantity');
      }
    },
    [userId, cartProducts],
  );

  const clearCart = useCallback(async () => {
    setCartProducts([]);

    try {
      if (userId) {
        await cartApi.clear(userId);
      } else {
        cartService.clearGuest();
      }
    } catch (error) {
      console.error('clearCart error:', error);
    }
  }, [userId]);

  const value = useMemo<CartContextType>(
    () => ({
      cartProducts,
      isCartLoading,
      addProductToCart,
      deleteProductFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [
      cartProducts,
      isCartLoading,
      addProductToCart,
      deleteProductFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
