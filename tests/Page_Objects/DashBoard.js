class DashBoard {
  constructor(page) {
    this.page = page;
    this.productsCard = page.locator("div.card-body");
    this.cartBTN = page.locator("[routerlink*='cart']");
  }

  async addProduct(productName) {
    const count = await this.productsCard.count();
    await this.productsCard.filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" }).click();
     
  }

  async checkCart() {
    await this.cartBTN.click();
    await this.page.locator(".cart li").first().waitFor();
  }
}

module.exports = { DashBoard };