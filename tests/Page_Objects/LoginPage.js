class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
    this.loginBTN = page.getByRole('button', { name: "login" });
  }

  async Launch(URL) {
    await this.page.goto(URL);
  }

  async validAttempt(UserName, Password) {
    await this.username.fill(UserName);
    await this.password.fill(Password);
    await this.loginBTN.click();
    await this.page.locator("div.card-body").first().waitFor();
  }
}

module.exports = { LoginPage };