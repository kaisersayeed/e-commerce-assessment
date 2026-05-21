import { Meta, StoryObj } from '@storybook/angular';
import { PriceDisplayComponent } from './price-display.component';

const meta: Meta<PriceDisplayComponent> = {
  title: 'Shared/UI/PriceDisplay',
  component: PriceDisplayComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `<app-price-display [price]="price" [rrp]="rrp"></app-price-display>`,
  }),
};

export default meta;

type Story = StoryObj<PriceDisplayComponent>;

export const OnSale: Story = {
  args: { price: 166, rrp: 223 },
};

export const BigSaving: Story = {
  args: { price: 83, rrp: 220 },
};

export const FullPrice: Story = {
  args: { price: 220, rrp: 220 },
};
