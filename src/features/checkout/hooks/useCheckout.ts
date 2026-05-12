import { useMemo, useState } from 'react';
import { createOrder } from '@/features/checkout/model/checkout.api';
import { calculateOrderTotals } from '@/features/checkout/model/checkout.service';
import type {
  CreateOrderPayload,
  PaymentDetails,
  ShippingDetails,
  OrderItem,
} from '../model/checkout.types';

type UseCheckoutArgs = {
  cartItems: OrderItem[];
  onSuccess?: () => void;
};

export const useCheckout = ({ cartItems, onSuccess }: UseCheckoutArgs) => {
  const [shipping, setShipping] = useState<ShippingDetails>({
    city: '',
    address: '',
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    method: 'card',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totals = useMemo(() => calculateOrderTotals(cartItems), [cartItems]);

  const canSubmit = useMemo(() => {
    if (!cartItems.length) return false;
    if (!shipping.address || !shipping.city) return false;
    return true;
  }, [cartItems, shipping]);

  const submitOrder = async (): Promise<string | null> => {
    setError(null);
    setIsSubmitting(true);

    try {
      const payload: CreateOrderPayload = {
        items: cartItems,
        shipping,
        payment,
        totals,
      };

      const order = await createOrder(payload);
      onSuccess?.();
      return order.orderId;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create order.';
      if (message === 'User not authenticated') {
        setError('Please login to place an order.');
      } else {
        setError('Failed to create order. Please try again.');
      }
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    shipping,
    setShipping,
    payment,
    setPayment,
    totals,
    canSubmit,
    isSubmitting,
    error,
    submitOrder,
  };
};
