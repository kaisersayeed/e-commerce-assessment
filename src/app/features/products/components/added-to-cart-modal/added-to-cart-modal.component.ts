import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CartStore } from '../../store/cart.store';
import {
  Product,
  getProductPricing,
  ProductPricing,
} from '../../../../shared/models/product.model';

export interface AddedToCartModalData {
  product: Product;
}

@Component({
  selector: 'app-added-to-cart-modal',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './added-to-cart-modal.component.html',
  styleUrl: './added-to-cart-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddedToCartModalComponent {
  protected readonly data = inject<AddedToCartModalData>(DIALOG_DATA);
  protected readonly dialogRef = inject(DialogRef);
  protected readonly cartStore = inject(CartStore);

  protected readonly pricing: ProductPricing = getProductPricing(this.data.product);

  close(): void {
    this.dialogRef.close();
  }
}
