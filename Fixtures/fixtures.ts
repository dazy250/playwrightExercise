import { test as base } from '@playwright/test';
import {LoginPage } from '../Pages/loginPage';
import { ConfirmationPage } from '../Pages/confirmationPage'

type BaseFixture = {
  loginPageFixture: LoginPage;
  confirmationPageFixture: ConfirmationPage;
};

export const test = base.extend<BaseFixture>({
  loginPageFixture: async ({ page }, use) => {
    const loginPageFixture = new LoginPage(page);
    await loginPageFixture.navigateTo();
    await use(loginPageFixture);
  },
  confirmationPageFixture: async ({ page }, use) => {
    const confirmationPageFixture = new ConfirmationPage(page);
    await use(confirmationPageFixture);
  }
});

export { expect } from '@playwright/test';