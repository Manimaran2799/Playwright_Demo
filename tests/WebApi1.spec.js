
//skip login process by calling login api
//skip order placement by calling order creation api


import { test, expect, request } from '@playwright/test';
const {ApiUtils} =require("./Utils/ApiUtils");


let response;
const loginpayload = {userEmail: "railone091@gmail.com", userPassword: "Pass@word1"};
const orderpayload={orders: [{country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};


test.beforeAll(async () => {
 const apicontext = await request.newContext();
 //obj for api utils
 const apiUtils=new ApiUtils(apicontext,loginpayload);
 response =await apiUtils.createorder(orderpayload);
  
}
);

test("Flow of adding cart and checkout", async ({ page }) => {
    await page.addInitScript(value => {
    window.localStorage.setItem('token', value);//sending token in local storage
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");//main url

  // ---------- ORDERS PAGE ----------
  await page.getByRole('button', { name: 'ORDERS' }).click();
  await page.locator("tbody tr").first().waitFor();
  const rows = page.locator("tbody tr");
  
  const rowcount = await rows.count();

  for (let i = 0; i < rowcount; i++) {
    const id = (await rows.nth(i).locator("th").textContent()).trim();

    if (id.trim() === response.orderID.trim()) {
      await rows.nth(i).locator("button:has-text('View')").click();
       
      break;
    }
    
  }

  // ---------- FINAL VALIDATION ----------
  await page.locator("div.col-text").first().waitFor();
  await expect(page.locator("div.col-text"))
    .toHaveText(response.orderID);

   await page.pause();
});