import { test, expect } from "@playwright/test";
import "dotenv/config";

const BASE_URL = process.env.SAUCEDEMO_BASE_URL;
const VALID_USERNAME = process.env.SAUCEDEMO_USER;
const VALID_PASSWORD = process.env.SAUCEDEMO_PASSWORD;

if (!BASE_URL) throw new Error("Missing SAUCEDEMO_BASE_URL in .env file");

if (!VALID_USERNAME || !VALID_PASSWORD) {
  throw new Error("Missing SAUCEDEMO_USER or SAUCEDEMO_PASSWORD in .env file");
}

test.describe("@ui @smoke @saucedemo Authentication Tests - SauceDemo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Successful Login with valid credentials", async ({ page }) => {
    await page.getByTestId("username").fill(VALID_USERNAME);
    await page.getByTestId("password").fill(VALID_PASSWORD);
    await page.getByTestId("login-button").click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId("title")).toHaveText("Products");
  });

  test("Unsuccessful Login with invalid credentials", async ({ page }) => {
    await page.getByTestId("username").fill("invalid_user");
    await page.getByTestId("password").fill("invalid_pass");
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("error")).toBeVisible();
  });

  test("Logout Functionality", async ({ page }) => {
    await page.getByTestId("username").fill(VALID_USERNAME);
    await page.getByTestId("password").fill(VALID_PASSWORD);
    await page.getByTestId("login-button").click();
    await expect(page).toHaveURL(/inventory\.html/);

    await expect(page.locator("#react-burger-menu-btn")).toBeEnabled();
    await page.locator("#react-burger-menu-btn").click();
    await expect(page.getByTestId("logout-sidebar-link")).toBeVisible();
    await page.getByTestId("logout-sidebar-link").click();
    await expect(page.getByTestId("login-button")).toBeVisible();
  });
});
