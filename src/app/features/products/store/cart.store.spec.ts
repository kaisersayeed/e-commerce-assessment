import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { CartStore } from './cart.store';
import { Product } from '@app/shared/models/product.model';

const mockProduct: Product = {
  sku: 'TEST-001',
  name: 'Test',
  price: 100,
  rrp: 150,
  image: '',
};

describe('CartStore', () => {
  let store: InstanceType<typeof CartStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartStore],
    });
    store = TestBed.inject(CartStore);
  });

  it('should start with empty cart', () => {
    expect(store.count()).toBe(0);
  });

  it('should add product and increment count', () => {
    TestBed.runInInjectionContext(() => store.add(mockProduct));
    expect(store.count()).toBe(1);
  });

  it('should increment quantity when adding same product twice', () => {
    TestBed.runInInjectionContext(() => {
      store.add(mockProduct);
      store.add(mockProduct);
    });
    expect(store.count()).toBe(2);
    expect(store.lineItems().length).toBe(1);
    expect(store.lineItems()[0]!.quantity).toBe(2);
  });

  it('should handle two different products', () => {
    const second: Product = { ...mockProduct, sku: 'TEST-002' };
    TestBed.runInInjectionContext(() => {
      store.add(mockProduct);
      store.add(second);
    });
    expect(store.count()).toBe(2);
    expect(store.lineItems().length).toBe(2);
  });

  it('should remove product by sku', () => {
    TestBed.runInInjectionContext(() => {
      store.add(mockProduct);
      store.remove(mockProduct.sku);
    });
    expect(store.count()).toBe(0);
  });

  it('should calculate subtotal correctly', () => {
    TestBed.runInInjectionContext(() => {
      store.add(mockProduct);
      store.add(mockProduct);
    });
    expect(store.subtotal()).toBe(200);
  });

  it('should decrement quantity by 1', () => {
    TestBed.runInInjectionContext(() => {
      store.add(mockProduct);
      store.add(mockProduct);
      store.decrement(mockProduct.sku);
    });
    expect(store.lineItems()[0]!.quantity).toBe(1);
    expect(store.count()).toBe(1);
  });

  it('should remove line when decrementing below 1', () => {
    TestBed.runInInjectionContext(() => {
      store.add(mockProduct);
      store.decrement(mockProduct.sku);
    });
    expect(store.count()).toBe(0);
    expect(store.lineItems().length).toBe(0);
  });

  it('should clear all items', () => {
    TestBed.runInInjectionContext(() => {
      store.add(mockProduct);
      store.add({ ...mockProduct, sku: 'TEST-002' });
      store.clear();
    });
    expect(store.count()).toBe(0);
    expect(store.lineItems().length).toBe(0);
  });
});
