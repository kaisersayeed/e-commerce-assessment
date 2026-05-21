import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer" role="contentinfo">
      <div class="footer__container">
        <p class="footer__copy">© 2025 Winning Group. All rights reserved.</p>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
