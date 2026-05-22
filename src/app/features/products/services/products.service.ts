import { inject, Injectable, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { PRODUCTS_ENDPOINT } from '../../../core/constants/api.constants';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  readonly productsResource = resource<Product[], void>({
    loader: () => firstValueFrom(this.http.get<Product[]>(PRODUCTS_ENDPOINT)),
  });
}
