import type { CartProduct } from '@/types/product';

export type CartItem = {
  productId: number;
  quantity: number;
  size: string;
  color: string;
};

export type CartContextType = {
  cartProducts: CartProduct[];
  isCartLoading: boolean;

  deleteProductFromCart: (productId: number, size: string, color: string) => Promise<void>;
  increaseQuantity: (productId: number, size: string, color: string) => Promise<void>;
  decreaseQuantity: (productId: number, size: string, color: string) => Promise<void>;
  addProductToCart: (product: CartProduct) => Promise<void>;
  clearCart: () => Promise<void>;
};
