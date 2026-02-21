import { test, expect } from "@playwright/test";
import { loginAsStandardUser } from "../../../src/utils/saucedemo/auth";
import { InventoryPage } from "../../../src/pages/saucedemo/inventory.page";
import { Products } from "../../../src/utils/saucedemo/data";
import "dotenv/config";

const BASE_URL = process.env.SAUCEDEMO_BASE_URL;

test.describe("@ui @e2e @regression @saucedemo Cart Tests - SauceDemo", () => {
  test("User can add a single product to cart", async ({ page }) => {
    await loginAsStandardUser(page);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(Products.SAUCE_LABS_BACKPACK);
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");

    await inventoryPage.goToCart();
    await expect(page.getByTestId("inventory-item")).toHaveCount(1);
  });
});
