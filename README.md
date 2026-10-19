
# Demoblaze — UI Test Automation

End-to-end tests for [Demoblaze](<https://www.demoblaze.com/index.html>) using JavaScript, WebdriverIO 10, and Mocha.

Uses the Page Object Model, JSON test data, ESLint, screenshots, and Allure reports.

## Requirements

- Node.js \>= 22.19 and npm
- Google Chrome
- Java 17+ (for Allure reports)

## Installation

Clone the repository and open a terminal in the project folder.

**macOS**

```
npm ci
npm run lint
npm test
```

**Windows (PowerShell)**

```
npm.cmd ci
npm.cmd run lint
npm.cmd test
```

## Running Tests

| Command | Test |
| --- | --- |
| `npm test` | All tests |
| `npm run test:signup` | Sign-up |
| `npm run test:login` | Login |
| `npm run test:cart` | Shopping cart |
| `npm run test:checkout` | Checkout |
| `npm run test:headless` | All tests in headless mode |

## Test Coverage

- **REG-001:** Sign-up confirmation
- **LOGIN-001:** Login validation
- **CART-001:** Product, price, and cart total validation
- **BUY-001:** Checkout, purchase receipt, and return to home

Tests run sequentially using a shared temporary account per execution. Registered accounts remain on the demo website.

Test scenarios and data are defined in JSON files under `test/data/`.

## Reports and Evidence

Screenshots and execution logs are saved under `evidence/`.

Generate and open Allure reports:

```
npm run allure:generate
npm run allure:open
```

## Project Structure

- `test/specs/` — Test cases and assertions
- `test/pages/` — Page Objects
- `test/components/` — Shared UI components
- `test/helpers/` — Common actions, logging, and screenshots
- `test/data/` — JSON test data
- `wdio.conf.js` — WebdriverIO configuration

## Evidence

<img width="3586" height="2154" alt="image" src="https://github.com/user-attachments/assets/b138e28e-0896-48b8-a2b0-e1d9b3839fdd" />
<img width="3598" height="2164" alt="image" src="https://github.com/user-attachments/assets/440c16d3-ad70-4de4-a1f1-14c8182f15c0" />


## References

- [WebdriverIO](<https://webdriver.io/docs/>)
- [Demoblaze](<https://www.demoblaze.com/index.html>)
