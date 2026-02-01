# multi-app-tests (Playwright + TypeScript)

This repository is a test automation portfolio project built with **Playwright and TypeScript**.
It demonstrates how to design and structure a scalable test automation framework covering
multiple applications and different test types (UI, API, and end-to-end).

The focus of this project is **framework architecture, test strategy, and maintainability** —
not only writing individual test cases.

---

## Tech Stack
- Playwright
- TypeScript
- npm

---

## Applications Under Test
- **SauceDemo** – end-to-end tests for an e-commerce-like application
- **DemoBlaze** – UI and API tests
- **ParaBank** – form-heavy flows and basic banking scenarios

> These are public demo applications. Their availability and data may change over time.

---

## Tagging Convention (Important)

Tests in this project are executed using **tags** instead of multiple Playwright config files.

Each test should have **at least two tags**:
1. **Test type**: `@ui` or `@api`
2. **Test scope**: `@smoke` or `@regression`

An additional application tag is recommended:
- `@saucedemo`
- `@demoblaze`
- `@parabank`

### Example
```js
test.describe('@ui @smoke @saucedemo SauceDemo', () => {
  test('user can log in successfully', async ({ page }) => {
    // test implementation
  });
});

test.describe('@api @regression @demoblaze DemoBlaze API', () => {
  test('GET products returns valid response schema', async ({ request }) => {
    // test implementation
  });
});
```

## Installation
```bash
npm install
npx playwright install
```

## Running Tests

The project uses **tags** to control which tests are executed.
This approach avoids multiple Playwright config files and keeps test execution simple and flexible.

Run all tests:
```bash
npx playwright test
Run smoke tests (critical paths only):

npx playwright test --grep @smoke
Run full regression suite:

npx playwright test --grep @regression
Run UI tests only:

npx playwright test --grep @ui
Run API tests only:

npx playwright test --grep @api
Run tests for a specific application:

npx playwright test --grep @saucedemo
npx playwright test --grep @demoblaze
npx playwright test --grep @parabank
Example: run Smoke + UI tests for DemoBlaze:

npx playwright test --grep "@smoke.*@ui.*@demoblaze"
After the execution, open the Playwright HTML report:

npx playwright show-report
For easier debugging, Playwright UI mode can be used:

npx playwright test --ui
```
Project Structure
The repository is organized by application and test type.
Reusable framework code is separated from test specifications to keep the project scalable and maintainable.

```
tests/
  saucedemo/
    e2e/            # end-to-end user flows (login, cart, checkout)
    smoke/          # minimal critical paths used for quick validation
  demoblaze/
    ui/             # UI-focused tests (cart, categories, modals)
    api/            # API tests (products, cart endpoints)
  parabank/
    ui/             # form-heavy flows and banking scenarios
    smoke/          # minimal critical paths

src/
  pages/            # Page Objects grouped by application
  fixtures/         # Playwright fixtures (authentication, setup, shared context)
  api/              # API clients, helpers and basic response validation
  utils/            # shared utilities (data factories, assertions, helpers)
  test-data/        # static data used by tests (optional)

storage/            # optional storageState files for authenticated sessions