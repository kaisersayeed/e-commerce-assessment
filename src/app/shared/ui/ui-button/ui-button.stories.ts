import { Meta, StoryObj } from '@storybook/angular';
import { UiButtonComponent } from './ui-button.component';

const meta: Meta<UiButtonComponent> = {
  title: 'Shared/UI/UiButton',
  component: UiButtonComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `<ui-button [variant]="variant" [disabled]="disabled" [loading]="loading">Add to Cart</ui-button>`,
  }),
};

export default meta;

type Story = StoryObj<UiButtonComponent>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true },
};
