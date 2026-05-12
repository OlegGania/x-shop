import { STORAGE_KEYS } from '@/shared/constants/storageKey';
import { storage } from '@/shared/lib/storage';
import type { CartItem } from './cart.types';
import { toSafeString } from './cart.utils';

export const cartStorage = {
  get(): CartItem[] {
    const raw = storage.get<any[]>(STORAGE_KEYS.CART, []);
    if (!Array.isArray(raw)) return [];

    if (raw.length > 0 && raw[0]?.productId != null) {
      return raw
        .map((rawItem) => ({
          productId: Number(rawItem.productId),
          quantity: Math.max(1, Number(rawItem.quantity ?? 1)),
          size: toSafeString(rawItem.size),
          color: toSafeString(rawItem.color),
        }))
        .filter((item) => Number.isFinite(item.productId) && item.productId > 0);
    }

    if (raw.length > 0 && raw[0]?.id != null) {
      return raw
        .map((legacyItem) => ({
          productId: Number(legacyItem.id),
          quantity: Math.max(1, Number(legacyItem.quantity ?? 1)),
          size: toSafeString(legacyItem.size),
          color: toSafeString(legacyItem.color),
        }))
        .filter((item) => Number.isFinite(item.productId) && item.productId > 0);
    }

    return [];
  },

  set(items: CartItem[]) {
    storage.set(STORAGE_KEYS.CART, items);
  },

  clear() {
    storage.set(STORAGE_KEYS.CART, []);
  },
};
