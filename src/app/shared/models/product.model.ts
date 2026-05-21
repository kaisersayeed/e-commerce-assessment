export interface Product {
  sku: string;
  name: string;
  price: number;
  rrp: number;
  image: string;
}

export interface ProductPricing {
  price: number;
  rrp: number;
  savings: number;
  savingsPct: number;
  isOnSale: boolean;
}

export function getProductPricing(product: Pick<Product, 'price' | 'rrp'>): ProductPricing {
  const savings = product.rrp - product.price;
  const savingsPct = Math.round((savings / product.rrp) * 100);
  return { price: product.price, rrp: product.rrp, savings, savingsPct, isOnSale: savings > 0 };
}
