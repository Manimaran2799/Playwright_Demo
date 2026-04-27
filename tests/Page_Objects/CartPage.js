const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartname = page.locator("div.cartSection h3");
    this.cart = page.locator(".cart li");
    this.checkoutBTN = page.getByRole("button", { name: "Checkout" });
    this.selectcountry = page.getByPlaceholder("Select Country");
    this.countryVisible = page.locator("section.ta-results");
    this.verifymail = page.locator("div.user__name label");
    this.orderBTN = page.getByText("Place Order");
    this.confirmPage = page.getByText("Thankyou for the order.");
    this.orderLoc = page.locator("label.ng-star-inserted");
    this.ordertabBTN = page.getByRole("button", { name: "ORDERS" });
  }

  async placeOrder(productName, countryname, mail) {
  
    await expect(this.cartname).toContainText(productName);

    await this.checkoutBTN.click();
    await this.selectcountry.pressSequentially("ind", { delay: 150 });

    await this.countryVisible.waitFor();
    await this.countryVisible.getByRole("button", { name: countryname }).first().click();

    await expect(this.verifymail).toHaveText(mail);
    await this.orderBTN.click();
  }

  async orderConfirmPage(productName) {
    await expect(this.confirmPage).toBeVisible();

    await expect(this.page.locator("td div.title").first())
      .toHaveText(productName);

    const rawText = await this.orderLoc.textContent();
    const match = rawText?.match(/[a-z0-9]+/i);
    const orderId = match ? match[0] : null;

    await this.ordertabBTN.click();
    await this.page.locator("tbody").waitFor();

    return orderId;
  }
}

module.exports = { CartPage };