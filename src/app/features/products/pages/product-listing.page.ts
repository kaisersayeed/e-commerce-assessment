import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-listing-page',
  standalone: true,
  template: `<p>Products</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListingPage {}
