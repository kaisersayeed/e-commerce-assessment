import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'ui-button',
  standalone: true,
  template: `
    <button
      [class]="'ui-button ui-button--' + variant()"
      [class.ui-button--loading]="loading()"
      [attr.disabled]="disabled() || loading() ? true : null"
      [attr.aria-busy]="loading()"
      [type]="type()"
    >
      @if (loading()) {
        <span class="ui-button__spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
  styleUrl: './ui-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly type = input<ButtonType>('button');
}
