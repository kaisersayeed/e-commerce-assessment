import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { PRODUCTS_ENDPOINT } from '../../../core/constants/api.constants';
import { Product } from '../../../shared/models/product.model';

const mockProducts: Product[] = [
  { sku: 'A-001', name: 'Product A', price: 100, rrp: 150, image: '' },
  { sku: 'B-002', name: 'Product B', price: 200, rrp: 200, image: '' },
];

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    TestBed.flushEffects();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make a GET request to the products endpoint', () => {
    const req = httpMock.expectOne(PRODUCTS_ENDPOINT);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should be in loading status before the request completes', () => {
    expect(service.productsResource.status()).toBe('loading');
    httpMock.expectOne(PRODUCTS_ENDPOINT).flush(mockProducts);
  });

  it('should resolve with the returned products', async () => {
    httpMock.expectOne(PRODUCTS_ENDPOINT).flush(mockProducts);
    await Promise.resolve();
    expect(service.productsResource.value()).toEqual(mockProducts);
  });

  it('should reflect error status when the request fails', async () => {
    httpMock
      .expectOne(PRODUCTS_ENDPOINT)
      .flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    await Promise.resolve();
    expect(service.productsResource.status()).toBe('error');
  });
});
