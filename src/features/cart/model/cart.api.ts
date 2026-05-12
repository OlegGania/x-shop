import { supabase } from '@/shared/api/supabaseClient';

export type CartRow = {
  product_id: number;
  quantity: number;
  size: string;
  color: string;
};

const toError = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error) return error;

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return new Error(error.message);
  }

  return new Error(fallbackMessage);
};

async function getOrCreateCartId(userId: string): Promise<string> {
  const { data: existing, error: selectError } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (selectError) {
    throw toError(selectError, 'Failed to get cart');
  }

  if (existing?.id) {
    return existing.id;
  }

  const { data: created, error: insertError } = await supabase
    .from('carts')
    .insert([{ user_id: userId }])
    .select('id')
    .single();

  if (insertError) {
    throw toError(insertError, 'Failed to create cart');
  }

  return created.id;
}

export const cartApi = {
  async getItems(userId: string): Promise<CartRow[]> {
    const cartId = await getOrCreateCartId(userId);

    const { data, error } = await supabase
      .from('cart_items')
      .select('product_id, quantity, size, color')
      .eq('cart_id', cartId);

    if (error) {
      throw toError(error, 'Failed to load cart items');
    }

    return (data ?? []) as CartRow[];
  },

  async upsertItems(
    userId: string,
    items: { productId: number; quantity: number; size: string; color: string }[],
  ): Promise<void> {
    if (items.length === 0) return;

    const cartId = await getOrCreateCartId(userId);

    const rows = items.map((item) => ({
      cart_id: cartId,
      product_id: item.productId,
      quantity: item.quantity,
      size: item.size ?? '',
      color: item.color ?? '',
    }));

    const { error } = await supabase
      .from('cart_items')
      .upsert(rows, { onConflict: 'cart_id,product_id,size,color' });

    if (error) {
      throw toError(error, 'Failed to save cart items');
    }
  },

  async setQuantity(
    userId: string,
    productId: number,
    quantity: number,
    size: string = '',
    color: string = '',
  ): Promise<void> {
    const cartId = await getOrCreateCartId(userId);

    const normalizedSize = size ?? '';
    const normalizedColor = color ?? '';

    if (quantity <= 0) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId)
        .eq('product_id', productId)
        .eq('size', normalizedSize)
        .eq('color', normalizedColor);

      if (error) {
        throw toError(error, 'Failed to delete cart item');
      }

      return;
    }

    const { error } = await supabase.from('cart_items').upsert(
      [
        {
          cart_id: cartId,
          product_id: productId,
          quantity,
          size: normalizedSize,
          color: normalizedColor,
        },
      ],
      {
        onConflict: 'cart_id,product_id,size,color',
      },
    );

    if (error) {
      throw toError(error, 'Failed to update cart item');
    }
  },

  async clear(userId: string): Promise<void> {
    const cartId = await getOrCreateCartId(userId);

    const { error } = await supabase.from('cart_items').delete().eq('cart_id', cartId);

    if (error) {
      throw toError(error, 'Failed to clear cart');
    }
  },
};
