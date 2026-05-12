import { CartItem } from './cart.types';

export const toSafeString = (value: unknown): string => String(value ?? '');

export const toCartItemKey = (item: CartItem) => `${item.productId}|${item.size}|${item.color}`;
