import { test, expect } from "@playwright/test";
import "dotenv/config";
import { LoginPage } from "../../../src/pages/saucedemo/login.page";
import { InventoryPage } from "../../../src/pages/saucedemo/inventory.page";
import { loginAsStandardUser } from "../../../src/utils/saucedemo/auth";

const BASE_URL = process.env.SAUCEDEMO_BASE_URL;
const VALID_USERNAME = process.env.SAUCEDEMO_USER;
const VALID_PASSWORD = process.env.SAUCEDEMO_PASSWORD;

test.describe("@ui @smoke @saucedemo Authentication Tests - SauceDemo", () => {
  test.skip(
    !BASE_URL || !VALID_USERNAME || !VALID_PASSWORD,
    "Missing SauceDemo env vars",
  );

  test("Successful Login with valid credentials", async ({ page }) => {
    await page.goto(BASE_URL!);

    const loginPage = new LoginPage(page);
    await loginPage.login(VALID_USERNAME!, VALID_PASSWORD!);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId("title")).toHaveText("Products");
  });

  test("Unsuccessful Login with invalid credentials", async ({ page }) => {
    await page.goto(BASE_URL!);

    const loginPage = new LoginPage(page);
    await loginPage.login("invalid_user", "invalid_pass");

    await loginPage.expectErrorContains("Username and password do not match");
  });

  test("Logout Functionality", async ({ page }) => {
    await loginAsStandardUser(page);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();

    await expect(page.getByTestId("login-button")).toBeVisible();
  });
});
