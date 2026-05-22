import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { PriceDisplayComponent } from '../../../../shared/ui/price-display/price-display.component';
import { UiSkeletonComponent } from '../../../../shared/ui/ui-skeleton/ui-skeleton.component';
import { Product, getProductPricing } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [PriceDisplayComponent, UiSkeletonComponent],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTileComponent {
  readonly product = input.required<Product>();
  readonly loading = input(false);

  readonly addToCart = output<Product>();
  readonly compare = output<Product>();

  readonly pricing = computed(() => getProductPricing(this.product()));

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }

  onCompare(): void {
    this.compare.emit(this.product());
  }
}
