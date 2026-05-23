import { describe, it, expect } from 'vitest';
import { getProductPricing } from './product.model';

describe('getProductPricing', () => {
  const product = { price: 166, rrp: 223 };

  it('calculates savings correctly', () => {
    expect(getProductPricing(product).savings).toBe(57);
  });

  it('calculates savings percentage correctly', () => {
    expect(getProductPricing(product).savingsPct).toBe(26);
  });

  it('marks as on sale when price < rrp', () => {
    expect(getProductPricing(product).isOnSale).toBe(true);
  });

  it('marks as not on sale when price equals rrp', () => {
    expect(getProductPricing({ price: 220, rrp: 220 }).isOnSale).toBe(false);
  });

  it('returns zero savings for full price product', () => {
    expect(getProductPricing({ price: 220, rrp: 220 }).savings).toBe(0);
  });
});
