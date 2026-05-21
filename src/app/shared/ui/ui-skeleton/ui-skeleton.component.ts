import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  template: `
    <div
      class="ui-skeleton"
      [class.ui-skeleton--rounded]="rounded()"
      [style.width]="width()"
      [style.height]="height()"
      role="status"
      aria-label="Loading..."
    ></div>
  `,
  styleUrl: './ui-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSkeletonComponent {
  readonly width = input<string>('100%');
  readonly height = input<string>('16px');
  readonly rounded = input(false);
}
