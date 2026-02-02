import { test, expect } from "@playwright/test";
import "dotenv/config";
import { LoginPage } from "../../../src/pages/saucedemo/login.page";
import { InventoryPage } from "../../../src/pages/saucedemo/inventory.page";

const BASE_URL = process.env.SAUCEDEMO_BASE_URL;
const VALID_USERNAME = process.env.SAUCEDEMO_USER;
const VALID_PASSWORD = process.env.SAUCEDEMO_PASSWORD;

// if (!BASE_URL) throw new Error("Missing SAUCEDEMO_BASE_URL in .env file");

// if (!VALID_USERNAME || !VALID_PASSWORD) {
//   throw new Error("Missing SAUCEDEMO_USER or SAUCEDEMO_PASSWORD in .env file");
// }

test.describe("@ui @smoke @saucedemo Authentication Tests - SauceDemo", () => {
  test.skip(
    !BASE_URL || !VALID_USERNAME || !VALID_PASSWORD,
    "Missing SauceDemo env vars",
  );
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL!);
  });

  test("Successful Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(VALID_USERNAME!, VALID_PASSWORD!);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId("title")).toHaveText("Products");
  });

  test("Unsuccessful Login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("invalid_user", "invalid_pass");
    await loginPage.expectErrorContains("Username and password do not match");
  });

  test("Logout Functionality", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(VALID_USERNAME!, VALID_PASSWORD!);
    await expect(page).toHaveURL(/inventory\.html/);

    await inventoryPage.logout();
    await expect(page.getByTestId("login-button")).toBeVisible();
  });
});
