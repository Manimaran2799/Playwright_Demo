const { expect } = require('allure-playwright');

class LoginPage {

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    this.username = page.getByRole('textbox', { name: 'Username' });
    this.pwd = page.getByRole('textbox', { name: 'Password' });
    this.loginbtn = page.getByRole('button', { name: /Login/i });
    this.incorrectalertbox=page.getByText('Invalid credentials', { exact: true })
  }

  async validLogin(username,password) {
    await this.username.fill(username);
    await this.pwd.fill(password);
    await this.loginbtn.click();
  }

  async invalidLogin(username, password) {
    await this.username.fill(username);
    await this.pwd.fill(password);
    await this.loginbtn.click();
    await expect(this.incorrectalertbox).toBeVisible();
    
  }
}

module.exports = { LoginPage };