import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular({ tsconfig: './tsconfig.spec.json' })],
  test: {
    environment: 'jsdom',
    setupFiles: ['@analogjs/vite-plugin-angular/setup-vitest', './src/test-setup.ts'],
    globals: true,
    include: ['src/**/*.spec.ts'],
  },
});
