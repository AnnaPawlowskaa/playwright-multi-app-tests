import { Page, expect, Locator } from "@playwright/test";

export class CartPage {
  inventoryItem: Locator;
  removeButton: Locator;
  checkoutButton: Locator;
  contonueShoppingButton: Locator;

  constructor(protected page: Page) {
    this.inventoryItem = page.getByTestId("inventory-item");
    this.removeButton = page.getByRole("button", { name: "Remove" });
    this.checkoutButton = page.getByTestId("checkout");
    this.contonueShoppingButton = page.getByTestId("continue-shopping");
  }
}
