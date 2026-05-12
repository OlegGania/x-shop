import type { CartItem } from './cart.types';
import { cartStorage } from './cart.storage';
import { cartApi } from './cart.api';
import { mergeItems } from './cart.merge';
import { getProductsByIds } from './cart.productsApi';
import { toSafeString } from './cart.utils';
import { CartProduct } from '@/types/product';

export const cartService = {
  getGuestItems(): CartItem[] {
    return cartStorage.get();
  },
  setGuestItems(items: CartItem[]) {
    cartStorage.set(items);
  },
  clearGuest() {
    cartStorage.clear();
  },

  async getUserItems(userId: string): Promise<CartItem[]> {
    const rows = await cartApi.getItems(userId);
    return rows.map((r) => ({
      productId: r.product_id,
      quantity: r.quantity,
      size: toSafeString(r.size),
      color: toSafeString(r.color),
    }));
  },

  async mergeGuestToUser(userId: string): Promise<CartItem[]> {
    const local = cartStorage.get();
    if (local.length === 0) {
      return await this.getUserItems(userId);
    }

    const server = await this.getUserItems(userId);
    const merged = mergeItems(server, local);

    await cartApi.upsertItems(userId, merged);
    cartStorage.clear();

    return merged;
  },

  async hydrateProducts(items: CartItem[]): Promise<CartProduct[]> {
    const ids = Array.from(new Set(items.map((i) => i.productId)));
    const products = await getProductsByIds(ids);

    const productMap = new Map(products.map((p) => [p.id, p]));

    return items
      .map((item): CartProduct | null => {
        const product = productMap.get(item.productId);
        if (!product) return null;

        const image =
          product.thumbnail || (Array.isArray(product.images) ? product.images[0] : '') || '';

        return {
          ...product,
          image,
          quantity: item.quantity,
          size: toSafeString(item.size),
          color: toSafeString(item.color),
        };
      })
      .filter((item): item is CartProduct => item !== null);
  },
};

export const persistGuestCart = (next: CartProduct[]) => {
  const items: CartItem[] = next.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    size: toSafeString(product.size),
    color: toSafeString(product.color),
  }));

  cartService.setGuestItems(items);
};
