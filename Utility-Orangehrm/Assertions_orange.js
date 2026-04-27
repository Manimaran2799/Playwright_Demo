import { expect } from '@playwright/test';

export class Assertions_orange {

  static async shouldBeVisible(locator) {
    await expect(locator).toBeVisible();
  }

  static async shouldHaveText(locator, text) {
    await expect(locator).toHaveText(text);
  }

  static async shouldHaveCount(locator, count) {
    await expect(locator).toHaveCount(count);
  }

   static async shouldContainText(locator, expectedText) {
    await expect(locator).toContainText(expectedText);
  }

}