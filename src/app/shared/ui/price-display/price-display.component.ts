import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { getProductPricing, type ProductPricing } from '../../models/product.model';

@Component({
  selector: 'app-price-display',
  standalone: true,
  templateUrl: './price-display.component.html',
  styleUrl: './price-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceDisplayComponent {
  readonly price = input.required<number>();
  readonly rrp = input.required<number>();

  readonly pricing = computed<ProductPricing>(() =>
    getProductPricing({ price: this.price(), rrp: this.rrp() })
  );
}
