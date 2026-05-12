import type { OrderItem, OrderTotals } from './checkout.types';
import type { CartProduct } from '@/types/product';
import { toOrderItem } from '@/types/product';

export const calculateOrderTotals = (orderItems: OrderItem[]): OrderTotals => {
  const subtotal = orderItems.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const discount = orderItems.reduce((acc, product) => {
    const discountPercent = product.discountPercentage ?? 0;
    return acc + product.price * product.quantity * (discountPercent / 100);
  }, 0);

  const deliveryFee = orderItems.length ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    deliveryFee: Number(deliveryFee.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

export const mapCartToOrderItems = (cartProducts: CartProduct[]): OrderItem[] => {
  return cartProducts.map(toOrderItem);
};
