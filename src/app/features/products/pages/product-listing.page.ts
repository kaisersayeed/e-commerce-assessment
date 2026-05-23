import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ProductGridComponent } from '../components/product-grid/product-grid.component';
import {
  AddedToCartModalComponent,
  AddedToCartModalData,
} from '../components/added-to-cart-modal/added-to-cart-modal.component';
import { ProductsStore } from '../store/products.store';
import { CartStore } from '../store/cart.store';
import { ProductsService } from '../services/products.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-listing-page',
  standalone: true,
  imports: [ProductGridComponent],
  templateUrl: './product-listing.page.html',
  styleUrl: './product-listing.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListingPage implements OnInit {
  protected readonly store = inject(ProductsStore);
  protected readonly cartStore = inject(CartStore);
  protected readonly productsService = inject(ProductsService);
  private readonly injector = inject(Injector);
  private readonly dialog = inject(Dialog);

  ngOnInit(): void {
    this.store.setLoading();

    effect(
      () => {
        const status = this.productsService.productsResource.status();

        if (status === 'resolved') {
          this.store.setProducts(this.productsService.productsResource.value()!);
        } else if (status === 'error') {
          this.store.setError('Failed to load products.');
        }
      },
      { injector: this.injector }
    );
  }

  onAddToCart(product: Product): void {
    this.cartStore.add(product);
    this.dialog.open<void, AddedToCartModalData>(AddedToCartModalComponent, {
      data: { product },
      backdropClass: 'modal-backdrop',
      panelClass: 'modal-panel',
      hasBackdrop: true,
    });
  }
}
