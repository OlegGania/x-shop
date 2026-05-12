import type { OrderItem } from '@/types/product';

export type ShippingDetails = {
  city: string;
  address: string;
};

export type PaymentMethod = 'card' | 'cash_on_delivery';

export type PaymentDetails = {
  method: PaymentMethod;
};

export type OrderTotals = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
};

export type CreateOrderPayload = {
  items: OrderItem[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
  totals: OrderTotals;
};

export type CreateOrderResult = {
  orderId: string;
};

export type { OrderItem };
