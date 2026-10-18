# Demoblaze — UI Test Automation

End-to-end test suite for [Demoblaze](https://www.demoblaze.com/index.html), built with JavaScript (ES Modules), WebdriverIO 10, and Mocha.

The project uses the Page Object Model to organize page interactions, JSON files for test data, and Allure for test reports. It also includes ESLint and screenshots for each test step.

The project covers four main flows: sign-up, login, shopping cart, and checkout. All tests run through the web interface.

## Requirements

- **Node.js 22.19 or higher** and npm. Use a compatible LTS version.
- **Google Chrome** installed. WebdriverIO manages the compatible driver with the current configuration.
- **Java 17 or higher** available in the `PATH` to generate and open Allure 2 reports.
- **VS Code** is optional. You can use any code editor with a terminal.

Check the installed versions before starting:

```bash
node --version
npm --version
java -version
```

If any command is not recognized, install the required tool before continuing.

The project includes files that define its dependencies, but **it does not install Node.js, Chrome, or Java**.

## Installation

Download or clone the repository and open a terminal in the folder that contains `package.json`.

### Windows (PowerShell)

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd test
```

### macOS

First, install Node.js, Chrome, and Java. Then run:

```bash
npm ci
npm run lint
npm test
```

You do not need to install WebdriverIO globally on either operating system.

**Why use `npm ci`?**

`package.json` lists the project dependencies, and `package-lock.json` keeps their exact versions. The `npm ci` command installs the dependencies using these files, so the project uses the same dependency versions.

## Running the Tests

To run the complete test suite:

```bash
npm test
```

To run a specific test or run Chrome without opening a browser window:

| Command | Description |
|---|---|
| `npm run test:signup` | Runs the sign-up test |
| `npm run test:login` | Runs the login test |
| `npm run test:cart` | Adds and checks a product in the cart |
| `npm run test:checkout` | Completes a purchase and checks the receipt |
| `npm run test:headless` | Runs all tests in headless mode |

Each test command removes previous reports and screenshots before starting.

The suite uses one worker and follows the order defined in `wdio.conf.js`: sign-up, login, cart, and checkout.

Failed tests are not retried automatically. When a test runs alone, a new account is created through the web interface if needed.

## Test Coverage

| ID | Test Scenario | Main Validation |
|---|---|---|
| `REG-001` | Sign-up | Confirmation message and modal closes |
| `LOGIN-001` | Login | Exact `Welcome <username>` text and visible `Log out` option |
| `CART-001` | Shopping cart | Confirmation message, product, price, and total; removes the added product |
| `BUY-001` | Checkout | Purchase details, total, receipt, and return to the home page |

Product prices are collected from the product details page and compared with the prices shown during checkout.

The goal is to check that the prices are consistent during the purchase flow, not to verify commercial prices.

## Test Data and Temporary Account

JSON files are used to define test scenarios without changing the test code:

- `test/data/users.json`: User settings, sign-up, and login.
- `test/data/products.json`: Products used in cart tests.
- `test/data/checkout.json`: Product and sample customer details for checkout.

Each scenario creates its own `it` test with a unique ID.

To add more test cases, copy an existing JSON entry and give it a new ID. Products must exist in the selected category and be visible on the catalog page. This version does not support catalog pagination.

A short email address, such as `qa8f2a4c90@example.com`, and a temporary password are generated for each test run.

The same account is used in all four scenarios. You can set the `TEST_PASSWORD` environment variable if you need to use a specific password.

Account information is stored temporarily in `.runtime/` and removed when the test run finishes normally.

If the process stops unexpectedly, some local files may remain.

Registered accounts remain on the demo website because the project does not include an account deletion process.

## Screenshots and Reports

Each test step is logged and a screenshot is taken when the step passes or fails, if the browser allows it.

Evidence files are organized as follows:

```text
evidence/
  <test-name>-<id>/
    001-<step-name>-passed.png
    002-<step-name>-failed.png
    execution.log
```

The actual files depend on the steps executed.

The `execution.log` file records the start, result, and duration of each step, using UTC timestamps.

Logs are also shown in the terminal and attached to Allure.

Passwords, cookies, and tokens are not written to the log.

Screenshots are taken for test steps, not for every WebDriver command. Native browser alerts may prevent screenshots.

To generate and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

## Project Structure

- `test/specs/`: Test cases and assertions.
- `test/pages/`: Page Objects for application pages.
- `test/components/`: Shared navigation, modals, and alerts.
- `test/helpers/`: Account setup, common actions, logging, and screenshots.
- `test/data/`: JSON test data.
- `wdio.conf.js`: Browser settings, test suites, timeouts, and reporter configuration.
- `scripts/clean.js`: Removes previous test results.

Selectors and page actions are kept outside the test specs.

Assertions use `expect-webdriverio`. The tests wait for specific application conditions instead of using fixed delays with `browser.pause()`.


## References

- [WebdriverIO: Best Practices](https://webdriver.io/docs/bestpractices)
- [WebdriverIO: Page Objects](https://webdriver.io/docs/pageobjects)
- [WebdriverIO: Allure Reporter](https://webdriver.io/docs/allure-reporter)
- [Demoblaze Website](https://www.demoblaze.com/index.html)
