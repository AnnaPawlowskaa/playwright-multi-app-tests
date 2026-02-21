import { Page, expect } from "@playwright/test";
import { LoginPage } from "../../pages/saucedemo/login.page";

type Credentials = {
  username: string;
  password: string;
};

export async function login(page: Page, creds: Credentials): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.login(creds.username, creds.password);
  await expect(page).toHaveURL(/inventory\.html/);
}

export async function loginAsStandardUser(page: Page): Promise<void> {
  const baseUrl = process.env.SAUCEDEMO_BASE_URL;
  const username = process.env.SAUCEDEMO_USER;
  const password = process.env.SAUCEDEMO_PASSWORD;

  if (!baseUrl || !username || !password) {
    throw new Error(
      "Missing SauceDemo env vars: SAUCEDEMO_BASE_URL / SAUCEDEMO_USER / SAUCEDEMO_PASSWORD",
    );
  }

  await page.goto(baseUrl);
  await login(page, { username, password });
}
