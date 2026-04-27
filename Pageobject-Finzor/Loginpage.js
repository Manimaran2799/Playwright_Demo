class Loginpage {
  constructor(page) {
    this.page = page;

    // Locators
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginBtn = page.getByRole('button', { name: 'LOGIN' });
  }

  // Actions
  async goto() {
    await this.page.goto('https://stage.finzorcbs.com/');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async takePageScreenshot() {
    await this.page.screenshot({ path: 'Screenshot.png' });
  }

  async takeButtonScreenshot() {
    await this.loginBtn.screenshot({ path: 'Screenshot1.png' });
  }
}

module.exports = { Loginpage };
