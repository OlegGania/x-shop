import { CartProduct } from '@/types/product';

export const isSameCartProduct = (
  cartProduct: CartProduct,
  productId: number,
  size: string,
  color: string,
) => {
  return (
    cartProduct.id === productId &&
    (cartProduct.size ?? '') === (size ?? '') &&
    (cartProduct.color ?? '') === (color ?? '')
  );
};

export const findCartProduct = (
  cartProducts: CartProduct[],
  productId: number,
  size: string,
  color: string,
) => {
  return cartProducts.find((product) => isSameCartProduct(product, productId, size, color));
};

export const updateCartProductQuantity = (
  cartProducts: CartProduct[],
  productId: number,
  quantity: number,
  size: string,
  color: string,
) => {
  return cartProducts.map((product) =>
    isSameCartProduct(product, productId, size, color) ? { ...product, quantity } : product,
  );
};

export const removeCartProduct = (
  cartProducts: CartProduct[],
  productId: number,
  size: string,
  color: string,
) => {
  return cartProducts.filter((product) => !isSameCartProduct(product, productId, size, color));
};
