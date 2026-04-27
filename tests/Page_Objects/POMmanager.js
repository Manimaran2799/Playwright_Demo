const { CartPage } = require('./CartPage');
const { DashBoard } = require('./DashBoard');
const { LoginPage } = require('./LoginPage');
const { Orderhistory } = require('./Orderhistory');

class POMmanager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboard = new DashBoard(page);
    this.cartpage = new CartPage(page);
    this.orderhistory=new Orderhistory(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboard;
  }

  getCartPage() {
    return this.cartpage;
  }

  getOrderhistory(){
    return this.orderhistory;
  }
}

module.exports = { POMmanager };