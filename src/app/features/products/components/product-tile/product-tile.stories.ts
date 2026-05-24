import { Meta, StoryObj } from '@storybook/angular';
import { Product } from '@app/shared/models/product.model';
import { ProductTileComponent } from './product-tile.component';

const onSaleProduct: Product = {
  sku: '671695659-X',
  name: 'Veal Inside - Provimi',
  price: 166,
  rrp: 223,
  image: 'https://dummyimage.com/300x300.png/ff4444/ffffff',
};

const fullPriceProduct: Product = {
  sku: 'FULL-001',
  name: 'Premium Widget Pro',
  price: 169,
  rrp: 169,
  image: 'https://dummyimage.com/300x300.png/5555cc/ffffff',
};

const longNameProduct: Product = {
  sku: 'LONG-001',
  name: 'Appetizer - Mini Egg Roll with Shrimp and Special Dipping Sauce',
  price: 113,
  rrp: 222,
  image: 'https://dummyimage.com/300x300.png/55cc55/ffffff',
};

const meta: Meta<ProductTileComponent> = {
  title: 'Features/Products/ProductTile',
  component: ProductTileComponent,
  tags: ['autodocs'],
  argTypes: {
    addToCart: { action: 'addToCart' },
    compare: { action: 'compare' },
  },
  render: (args) => ({
    props: args,
    template: `
      <app-product-tile
        [product]="product"
        [loading]="loading"
        (addToCart)="addToCart($event)"
        (compare)="compare($event)"
      ></app-product-tile>
    `,
  }),
};

export default meta;

type Story = StoryObj<ProductTileComponent>;

export const OnSale: Story = {
  name: 'On sale — with savings',
  args: { product: onSaleProduct },
};

export const FullPrice: Story = {
  name: 'Full price — no discount',
  args: { product: fullPriceProduct },
};

export const LongName: Story = {
  name: 'Long name — 2-line clamp',
  args: { product: longNameProduct },
};

export const Loading: Story = {
  name: 'Loading — skeleton state',
  args: { product: onSaleProduct, loading: true },
};
