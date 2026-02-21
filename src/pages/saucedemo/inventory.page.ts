import { Page, expect, Locator } from "@playwright/test";

export class InventoryPage {
  pageTitle: Locator;
  openMenuButton: Locator;
  logoutLink: Locator;
  cartLink: Locator;

  constructor(protected page: Page) {
    this.pageTitle = page.getByTestId("title");
    this.openMenuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.getByTestId("logout-sidebar-link");
    this.cartLink = page.getByTestId("shopping-cart-link");
  }

  async openMenu(): Promise<void> {
    await expect(this.openMenuButton).toBeEnabled();
    await this.openMenuButton.click();
    await expect(this.logoutLink).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async addProductToCart(productTestId: string): Promise<void> {
    await this.page.getByTestId(productTestId).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
