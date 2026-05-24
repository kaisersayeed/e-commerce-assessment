import { applicationConfig, moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  provideZonelessChangeDetection,
} from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { CartDrawerComponent } from './cart-drawer.component';
import { CartStore } from '../../store/cart.store';
import { Product } from '../../../../shared/models/product.model';

const mockProducts: Product[] = [
  {
    sku: 'TV-001',
    name: 'Samsung 85 Inch The Frame Pro NeoQLED 4K MiniLED TV QA85LS03FWWXXY [2025]',
    price: 3700,
    rrp: 4200,
    image: 'https://dummyimage.com/300x300.png/5555cc/ffffff',
  },
  {
    sku: 'CARE-001',
    name: '4 Year Care Plan For Home',
    price: 240,
    rrp: 240,
    image: 'https://dummyimage.com/300x300.png/55cc55/ffffff',
  },
  {
    sku: 'HDMI-001',
    name: 'Premium HDMI 2.1 Cable 3m',
    price: 49,
    rrp: 69,
    image: 'https://dummyimage.com/300x300.png/cc5555/ffffff',
  },
  {
    sku: 'WALL-001',
    name: 'TV Wall Mount Universal 32–85 Inch',
    price: 89,
    rrp: 129,
    image: 'https://dummyimage.com/300x300.png/55cccc/ffffff',
  },
  {
    sku: 'SOUND-001',
    name: 'Soundbar 5.1 Dolby Atmos 360W',
    price: 599,
    rrp: 799,
    image: 'https://dummyimage.com/300x300.png/cc55cc/ffffff',
  },
];

@Component({
  selector: 'app-empty-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CartDrawerComponent],
  template: `<app-cart-drawer />`,
})
class EmptyHost {
  constructor() {
    inject(CartStore).clear();
  }
}

@Component({
  selector: 'app-with-items-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CartDrawerComponent],
  template: `<app-cart-drawer />`,
})
class WithItemsHost {
  constructor() {
    const store = inject(CartStore);
    store.clear();
    mockProducts.slice(0, 2).forEach((p) => store.add(p));
  }
}

@Component({
  selector: 'app-many-items-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CartDrawerComponent],
  template: `<app-cart-drawer />`,
})
class ManyItemsHost {
  constructor() {
    const store = inject(CartStore);
    store.clear();
    mockProducts.forEach((p) => {
      store.add(p);
      store.add(p);
    });
  }
}

const sharedConfig = applicationConfig({
  providers: [
    provideZonelessChangeDetection(),
    CartStore,
    { provide: DialogRef, useValue: { close: () => {} } },
  ],
});

const meta: Meta<CartDrawerComponent> = {
  title: 'Features/Products/CartDrawer',
  component: CartDrawerComponent,
  tags: ['autodocs'],
  decorators: [sharedConfig],
};

export default meta;

export const Empty: StoryObj = {
  name: 'Empty — no items',
  decorators: [moduleMetadata({ imports: [EmptyHost] })],
  render: () => ({
    props: {},
    template: `<div style="width:420px;height:100dvh;overflow:hidden"><app-empty-host /></div>`,
  }),
};

export const WithItems: StoryObj = {
  name: 'With items — 2 products',
  decorators: [moduleMetadata({ imports: [WithItemsHost] })],
  render: () => ({
    props: {},
    template: `<div style="width:420px;height:100dvh;overflow:hidden"><app-with-items-host /></div>`,
  }),
};

export const ManyItems: StoryObj = {
  name: 'Many items — scrollable list',
  decorators: [moduleMetadata({ imports: [ManyItemsHost] })],
  render: () => ({
    props: {},
    template: `<div style="width:420px;height:100dvh;overflow:hidden"><app-many-items-host /></div>`,
  }),
};
