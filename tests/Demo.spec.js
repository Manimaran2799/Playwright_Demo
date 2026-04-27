const { test, expect } = require('@playwright/test');

test.only("Flow of adding cart and out for delivery", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  const mail = `railone103@gmail.com`;

  // ---------- LOGIN PAGE ----------
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  // ---------- REGISTER ----------
  await page.getByText("Register here").click();

  await page.getByPlaceholder("First Name").fill("railone");
  await page.getByPlaceholder("Last Name").fill("Suplejx");
  await page.getByPlaceholder("email@example.com").fill(mail);
  await page.getByPlaceholder("enter your number").fill("9876543210");

  // ✅ Occupation dropdown (fixed)
  await page.getByRole('combobox').selectOption('Student');

  await page.getByLabel("Male").nth(0).check();

  await page.locator("#userPassword").fill("Pass@word1");
  await page.locator("#confirmPassword").fill("Pass@word1");

  await page.locator("[type='checkbox']").check();
  await page.locator("[value='Register']").click();

  await expect(page.getByText("Account Created Successfully")).toBeVisible();

  await page.getByRole("button", { name: "Login" }).click();

  // ---------- LOGIN ----------
  await page.getByPlaceholder("email@example.com").fill(mail);
  await page.getByPlaceholder("enter your passsword").fill("Pass@word1");

  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.getByRole('button', { name: "login" }).click()
  ]);

  // wait for products
  await page.locator("div.card-body").first().waitFor();

  // ---------- ADD PRODUCT ----------
  const productName = "iphone 13 pro";

  // ✅ No loop - correct locator
  await page.locator("div.card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  // ---------- CART ----------
  await page.locator("li").getByRole('button', { name: 'Cart' }).click();
  await page.locator(".cart li").first().waitFor();

  await expect(page.locator("div.cartSection h3"))
    .toContainText(productName);

  // ---------- CHECKOUT ----------
  await page.getByText("Buy Now").click();

  // ✅ Country selection (fixed)
  await page.getByPlaceholder("Select Country")
    .pressSequentially("ind", { delay: 150 });

  await page.locator("section.ta-results").waitFor();

  await page.getByRole("button", { name: "India" }).nth(1).click();

  // verify email
  await expect(page.locator("div.user__name label"))
    .toHaveText(mail);

  // ---------- PLACE ORDER ----------
  await page.getByText("Place Order").click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

  await expect(page.locator("td div.title").first())
    .toHaveText(productName);

  // ---------- GET ORDER ID ----------
  const rawText = (await page.locator("label.ng-star-inserted").textContent());
  const OrderID = rawText.match(/[a-z0-9]+/i)[0];

  // ---------- GO TO ORDERS ----------
  await page.getByRole("button", { name: "ORDERS" }).click();

  await page.locator("tbody").waitFor();

//   // ---------- VERIFY ORDER ----------
//   const rows = page.locator("tbody tr");

//   for (let i = 0; i < await rows.count(); i++) {

//     const ID = (await rows.nth(i).locator("[scope='row']").textContent()).trim();

//     if (ID === OrderID) {
//       await rows.nth(i).getByRole("button",{name:"View"}).click();
//       break;
//     }
//   }

  // ---------- FINAL VALIDATION ----------
  const row =page.locator("tbody tr")
  .filter({ hasText: OrderID.trim() });

  await expect(row).toBeVisible();
  await row.getByRole("button", { name: "View" }).click();

  await expect(page.getByText(" order summary ")).toBeVisible();
  await expect(page.locator("div.title")).toHaveText(productName);


});