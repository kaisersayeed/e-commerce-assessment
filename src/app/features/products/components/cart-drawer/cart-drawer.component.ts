import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDrawerComponent {
  protected readonly cartStore = inject(CartStore);
  protected readonly dialogRef = inject(DialogRef);

  close(): void {
    this.dialogRef.close();
  }
}
