import type { CartItem } from './cart.types';
import { toCartItemKey } from './cart.utils';

export function mergeItems(server: CartItem[], local: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();

  for (const serverItem of server) map.set(toCartItemKey(serverItem), { ...serverItem });
  for (const localItem of local) {
    const key = toCartItemKey(localItem);
    const prev = map.get(key);
    map.set(
      key,
      prev ? { ...prev, quantity: prev.quantity + localItem.quantity } : { ...localItem },
    );
  }

  return Array.from(map.values());
}
