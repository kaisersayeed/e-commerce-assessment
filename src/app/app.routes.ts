import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        title: 'Winning — Home',
        loadComponent: () => import('./features/home/pages/home.page').then((m) => m.HomePage),
      },
      {
        path: 'products',
        title: 'Winning — All Products',
        loadComponent: () =>
          import('./features/products/pages/product-listing.page').then(
            (m) => m.ProductListingPage
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
