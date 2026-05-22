import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CartItem } from '../../../shared/models/cart.model';
import { Product } from '../../../shared/models/product.model';

const CART_STORAGE_KEY = 'wg_cart';

interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = {
  items: {},
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ items }) => ({
    count: computed(() => Object.values(items()).reduce((sum, item) => sum + item.quantity, 0)),
    lineItems: computed(() => Object.values(items())),
    subtotal: computed(() =>
      Object.values(items()).reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    ),
  })),
  withMethods((store) => ({
    add(product: Product): void {
      const current = store.items();
      const existing = current[product.sku];
      patchState(store, {
        items: {
          ...current,
          [product.sku]: existing
            ? { ...existing, quantity: existing.quantity + 1 }
            : { product, quantity: 1 },
        },
      });
    },
    remove(sku: string): void {
      const next = { ...store.items() };
      delete next[sku];
      patchState(store, { items: next });
    },
    hasItem(sku: string) {
      return computed(() => sku in store.items());
    },
  })),
  withHooks((store) => ({
    onInit() {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
          patchState(store, { items: JSON.parse(saved) as Record<string, CartItem> });
        }
      } catch {
        // localStorage unavailable
      }

      try {
        effect(() => {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(store.items()));
        });
      } catch {
        // localStorage unavailable
      }
    },
  }))
);
