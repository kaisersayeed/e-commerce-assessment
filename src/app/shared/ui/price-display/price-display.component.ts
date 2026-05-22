import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { getProductPricing, type ProductPricing } from '../../models/product.model';

@Component({
  selector: 'app-price-display',
  standalone: true,
  template: `
    <div class="price-display">
      <span class="price-display__current" [attr.aria-label]="'Price ' + price()">
        \${{ price() }}
      </span>
      @if (pricing().isOnSale) {
        <div class="price-display__sale-info">
          <span class="price-display__savings">
            <strong>\${{ pricing().savings }} ({{ pricing().savingsPct }}%)</strong> off
          </span>
          <span class="price-display__rrp">RRP \${{ rrp() }}</span>
        </div>
      }
    </div>
  `,
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
