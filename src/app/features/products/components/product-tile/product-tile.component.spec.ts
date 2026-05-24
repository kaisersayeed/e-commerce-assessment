import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductTileComponent } from './product-tile.component';
import { Product } from '@app/shared/models/product.model';

const onSaleProduct: Product = {
  sku: 'TEST-001',
  name: 'Test Product',
  price: 100,
  rrp: 150,
  image: '',
};

const fullPriceProduct: Product = {
  sku: 'TEST-002',
  name: 'Full Price Product',
  price: 150,
  rrp: 150,
  image: '',
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductTileComponent],
  template: `
    <app-product-tile
      [product]="product"
      [loading]="loading"
      (addToCart)="added = $event"
      (compare)="compared = $event"
    />
  `,
})
class HostComponent {
  product = onSaleProduct;
  loading = false;
  added: Product | null = null;
  compared: Product | null = null;
}

describe('ProductTileComponent', () => {
  function setup(overrides: Partial<HostComponent> = {}) {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, overrides);
    fixture.detectChanges();
    return fixture;
  }

  it('renders product name', () => {
    const fixture = setup();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toContain('Test Product');
  });

  it('shows skeleton and hides content when loading', () => {
    const fixture = setup({ loading: true });
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('article')?.classList).toContain('product-tile--loading');
    expect(el.querySelector('h2')).toBeNull();
  });

  it('applies on-sale class when product is on sale', () => {
    const fixture = setup({ product: onSaleProduct });
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('article')?.classList).toContain('product-tile--on-sale');
  });

  it('does not apply on-sale class for full price product', () => {
    const fixture = setup({ product: fullPriceProduct });
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('article')?.classList).not.toContain('product-tile--on-sale');
  });

  it('emits addToCart with product on button click', () => {
    const fixture = setup();
    fixture.debugElement.query(By.css('[aria-label*="Add"]')).nativeElement.click();
    expect(fixture.componentInstance.added).toEqual(onSaleProduct);
  });

  it('emits compare with product on button click', () => {
    const fixture = setup();
    fixture.debugElement.query(By.css('[aria-label*="Compare"]')).nativeElement.click();
    expect(fixture.componentInstance.compared).toEqual(onSaleProduct);
  });
});
