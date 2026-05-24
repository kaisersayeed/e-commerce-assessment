import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { CartStore } from '../../features/products/store/cart.store';
import { CartDrawerComponent } from '../../features/products/components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly cartStore = inject(CartStore);
  private readonly dialog = inject(Dialog);

  openCart(): void {
    this.dialog.open(CartDrawerComponent, {
      backdropClass: 'modal-backdrop',
      panelClass: 'cart-drawer-panel',
      hasBackdrop: true,
    });
  }
}
