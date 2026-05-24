# Winning Group — Frontend Assessment

A responsive e-commerce product listing built with Angular 20, NgRx Signal Store, and a custom SCSS design token system.

---

## Setup

```bash
npm install
npm start          # http://localhost:4200
npm run storybook  # http://localhost:6006
npm test           # Vitest unit tests
npm run build      # production build
```

### Tooling

| Tool | Purpose |
|---|---|
| Vitest + `@analogjs/vitest-angular` | Fast unit tests, no Karma/Jasmine |
| Storybook 10 | Component development and visual documentation |
| ESLint + `@angular-eslint` | Angular-specific lint rules, enforces `OnPush`, selector prefixes, no `any` |
| Prettier | Consistent formatting |
| Husky + lint-staged | Pre-commit: ESLint fix + Prettier on staged files only |

TypeScript is configured at maximum strictness: `strict`, `noUncheckedIndexedAccess`, `noImplicitReturns`, `noImplicitOverride`, `strictTemplates`.

---

## Folder structure

```
src/app/
├── core/          # App-wide constants, interceptors
├── features/      # Feature modules (products, home)
│   └── products/
│       ├── components/   # Dumb + smart components scoped to this feature
│       ├── pages/        # Routed entry points (one per route)
│       ├── services/     # Data fetching (ProductsService + resource)
│       └── store/        # ProductsStore, CartStore
├── layout/        # Shell, Header, Footer — structural chrome
└── shared/
    ├── models/    # Interfaces + pure functions (Product, Cart, getProductPricing)
    ├── pipes/     # Shared pipes
    └── ui/        # Design system primitives (PriceDisplay, UiSkeleton, UiButton)
```

`pages/` contains routed entry points only — they wire stores, services, and layout. `components/` contains everything renderable. The distinction is routing responsibility, not smart vs dumb.

---

## Design system

Component library is documented in Storybook (`npm run storybook`):

| Component | Stories |
|---|---|
| `UiButton` | Variants, sizes, states |
| `UiSkeleton` | Loading placeholder shapes |
| `PriceDisplay` | On sale, full price, big saving |
| `ProductTile` | On sale, full price, long name, loading skeleton |
| `CartDrawer` | Empty, with items, many items (scrollable) |

---
