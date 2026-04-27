
const {test,expect}=require('@playwright/test');
const { promises } = require('node:dns');

test("practise login,get text flow", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const RegisterBTN = page.locator("a.btn1");
  await RegisterBTN.click();

  await page.locator("#firstName").fill("abcd");
  await page.locator("#lastName").fill("abcd");
  await page.locator("#userEmail").fill("Yomail@gmail.com");
  await page.locator("#userMobile").fill("9876543210");

  await page.locator("[formcontrolname='occupation']").selectOption("Engineer");

  await page.locator("input[value='Male']").check();

  await page.locator("[formcontrolname='userPassword']").fill("Pass@word1");
  await page.locator("#confirmPassword").fill("Pass@word1");

  await page.locator("[type='checkbox']").check();

  
  await page.locator("[value='Register']").click();

  console.log(await page.getByText("Account Created Successfully").textContent());

  await page.locator(".btn.btn-primary").click();

  // login
  await page.locator("#userEmail").fill("manimaran.s2799@gmail.com");
  await page.locator("#userPassword").fill("Pass@word1");
  await page.locator("[type='submit']").click();

  console.log(await page.locator(".card-body b").first().textContent());

  

});

test("UI test", async ({ browser }) => {

 const context = await browser.newContext();
 const page = await context.newPage();

 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

 const RadioBTN = page.locator("[name='radio']");

 await page.locator("#username").fill("beast@yopamil.com");
 await page.locator("#password").fill("Pass@123");

 await RadioBTN.last().click();
 await page.locator("#okayBtn").click();

 console.log(await RadioBTN.last().isChecked());

 await expect(RadioBTN.last()).toBeChecked();

 await page.locator("select.form-control").selectOption("stud");

 await page.locator("#terms").click();
 await expect(page.locator("#terms")).toBeChecked();

 await page.locator("#terms").uncheck();
 await expect(page.locator("#terms")).not.toBeChecked();

 await expect(page.locator("[href*='rahul']")).toHaveAttribute("class","blinkingText");

  const [newPage] = await Promise.all([
  context.waitForEvent("page"),
  page.locator("[href*='rahul']").click()
]);

const text = await newPage.locator(".red").textContent();
const text2=text.split("@"); 
const mail=text2[1].split(".")[0]; 
console.log(mail);

await page.locator("#username").fill(mail);
});


test.only("Flow of adding cart and out for delivery", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // ✅ dynamic email (important)
  const mail = `railone091@gmail.com`;

  // ---------- LOGIN PAGE ----------
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  // ---------- REGISTER ----------
  await page.getByRole('button',{name:"Register"}).click();

  await page.getByPlaceholder("First Name").fill("railone");
  await page.getByPlaceholder("Last Name").fill("Suplejx");
  await page.getByPlaceholder("email@example.com").fill(mail);
  await page.getByPlaceholder("enter your number").fill("9876543210");

  await page.getByLabel("Occupation").selectOption("Engineer");
  await page.getByLabel("Male").check();

  await page.getByPlaceholder("Passsword").fill("Pass@word1");
  await page.getByPlaceholder("Confirm Passsword").fill("Pass@word1");

  await page.locator("[type='checkbox']").check();
  await page.locator("[value='Register']").click();

  await expect(page.getByText("Account Created Successfully")).toBeVisible();

  await page.getByRole("button",{name:"Login"}).click();

  // ---------- LOGIN ----------
  await page.getByPlaceholder("email@example.com").fill(mail);
  await page.getByPlaceholder("enter your passsword").fill("Pass@word1");

  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.getByRole('button', {name:"login"}).click()
  ]);

  // wait for products
  await page.locator("div.card-body").first().waitFor();

  // ---------- ADD PRODUCT ----------
  const productName = "iphone 13 pro";

 await page.locator("div.card-body").getByText(productName).getByRole("button",{name:" Add To Cart"}).click();
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const name = (await products.nth(i).locator("b").textContent()).trim();
    if (name === productName) {
      await products.nth(i).locator("button:has-text('Add To Cart')").click();
      break;
    }
  }

  // ---------- CART ----------
  await page.locator("[routerlink*='cart']").click();
  await page.locator(".cart li").first().waitFor();

  await expect(page.locator("div.cartSection h3"))
    .toContainText(productName);

  // ---------- CHECKOUT ----------
  await page.locator("li button[type='button']").click();

  const dropdown = page.locator("input[placeholder*='Select Country']");
  await dropdown.pressSequentially("ind", {delay:150}); 

  const results = page.locator("section[class*='ta-results']");
  await results.waitFor();

  const options = results.locator("button"); 
  const optionscount = await options.count(); 

  for (let i = 0; i < optionscount; i++) {
    const optionText = await options.nth(i).textContent(); 

    if (optionText.trim() === "India") {
      await options.nth(i).click();
      break;
    }
  }

  // verify email
  await expect(page.locator("div.user__name label"))
    .toHaveText(mail);

  // ---------- PLACE ORDER ----------
  await page.locator("a.action__submit").click();

  await expect(page.locator(".hero-primary"))
    .toContainText("Thankyou for the order");

  await expect(page.locator("td div.title").first())
    .toHaveText(productName);

  // ---------- GET ORDER ID ----------
  const OrderID = (await page.locator("label.ng-star-inserted").textContent()).trim();

  // ---------- GO TO ORDERS ----------
  await page.locator("button[routerlink='/dashboard/myorders']").click();

  const P = page.locator("h1");
  await P.waitFor();

  // ---------- VERIFY ORDER ----------
  const row = page.locator("tbody tr");
  const rowcount = await row.count();

  for (let i = 0; i < rowcount; i++) {
    
    const ID = (await row.nth(i).locator("th").textContent()).trim();

    if (ID === OrderID) {

      await row.nth(i).locator("button:has-text('View')").click(); // ✅ specific button
      break;
    }
  }

  // ---------- FINAL VALIDATION ----------
  await expect(page.locator("div.col-text"))
    .toHaveText(OrderID);

  await page.pause();
});


/** @param {import('@playwright/test').Page} page */


// @ts-check