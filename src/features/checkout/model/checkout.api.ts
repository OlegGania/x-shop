import { supabase } from '@/shared/api/supabaseClient';
import { CreateOrderPayload, CreateOrderResult } from './checkout.types';

export const createOrder = async (payload: CreateOrderPayload): Promise<CreateOrderResult> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      items: payload.items,
      shipping_address: payload.shipping,
      payment_method: payload.payment.method,
      subtotal: payload.totals.subtotal,
      discount: payload.totals.discount,
      shipping: payload.totals.deliveryFee,
      total: payload.totals.total,
      status: 'pending',
    })
    .select('id')
    .single();

  if (error) {
    console.error('[createOrder error]', error);
    throw error;
  }

  return {
    orderId: String(data.id),
  };
};
