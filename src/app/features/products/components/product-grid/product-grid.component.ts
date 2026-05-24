import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProductTileComponent } from '../product-tile/product-tile.component';
import { Product } from '@app/shared/models/product.model';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductTileComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent {
  readonly products = input.required<Product[]>();
  readonly loading = input(false);
  readonly error = input<string | null>(null);

  readonly addToCart = output<Product>();
  readonly compare = output<Product>();

  readonly skeletonItems = Array(12).fill(null);

  protected readonly skeletonProduct: Product = {
    sku: '',
    name: '',
    price: 0,
    rrp: 0,
    image: '',
  };
}
