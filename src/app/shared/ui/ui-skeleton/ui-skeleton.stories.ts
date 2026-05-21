import { Meta, StoryObj } from '@storybook/angular';
import { UiSkeletonComponent } from './ui-skeleton.component';

const meta: Meta<UiSkeletonComponent> = {
  title: 'Shared/UI/UiSkeleton',
  component: UiSkeletonComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `<ui-skeleton [width]="width" [height]="height" [rounded]="rounded"></ui-skeleton>`,
  }),
};

export default meta;

type Story = StoryObj<UiSkeletonComponent>;

export const Default: Story = {
  args: { width: '200px', height: '16px' },
};

export const Wide: Story = {
  args: { width: '100%', height: '16px' },
};

export const Card: Story = {
  args: { width: '100%', height: '200px' },
};

export const Rounded: Story = {
  args: { width: '48px', height: '48px', rounded: true },
};
