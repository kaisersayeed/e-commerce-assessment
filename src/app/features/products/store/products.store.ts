import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from '../../../shared/models/product.model';

type ProductsStatus = 'idle' | 'loading' | 'success' | 'error';

interface ProductsState {
  products: Product[];
  status: ProductsStatus;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ status, products }) => ({
    isLoading: computed(() => status() === 'loading'),
    isEmpty: computed(() => status() === 'success' && products().length === 0),
    hasError: computed(() => status() === 'error'),
  })),
  withMethods((store) => ({
    setProducts(products: Product[]): void {
      patchState(store, { products, status: 'success', error: null });
    },
    setLoading(): void {
      patchState(store, { status: 'loading', error: null });
    },
    setError(error: string): void {
      patchState(store, { status: 'error', error });
    },
  }))
);
