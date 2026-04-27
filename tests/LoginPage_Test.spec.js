const { test, expect } = require('@playwright/test');
const { POMmanager } = require('./Page_Objects/POMmanager');
const dataset=JSON.parse(JSON.stringify(require("./Utils/Letsshop_testdata.json")));


for(const data of dataset)
test(` @smoke Pom for e-cart ${data.Productname}`, async ({ page }) => {
  const pomManager = new POMmanager(page);

  // Login
  const loginPage = pomManager.getLoginPage();
  await loginPage.Launch(data.URL);
  await loginPage.validAttempt(data.Username, data.Password);

  // Dashboard
  const dashBoard = pomManager.getDashboardPage();
  await dashBoard.addProduct(data.Productname);
  await dashBoard.checkCart();

  // Cart
  const cartpage = pomManager.getCartPage();
  await cartpage.placeOrder(data.Productname, "India", data.Username);

  const orderId = await cartpage.orderConfirmPage(data.Productname);

  console.log("Order ID : "+orderId);
  await expect(orderId).not.toBeNull();


  //OrdersHistory and Review
  const orderhistory=pomManager.getOrderhistory();

  await orderhistory.orderCheck(orderId);
  await orderhistory.finalValidation(orderId);
});