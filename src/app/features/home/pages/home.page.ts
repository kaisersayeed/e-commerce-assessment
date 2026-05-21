import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `<p>Home</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
