import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  console.log('Login before each test');

  await page.goto('https://www.demoblaze.com/');

  await page.click('#login2');
  await page.fill('#loginusername', 'heromaaran');
  await page.fill('#loginpassword', 'Pass@123');
  await page.click("button[onclick='logIn()']");


});

test.afterEach(async ({ page }) => {
  console.log('Logout after each test');

  await page.click('#logout2');
  await expect(page.locator('#login2')).toBeVisible();
});

//  Test 1: Get all products count
test('Get all products count', async ({ page }) => {

  await page.waitForSelector('.hrefch');

  const products = page.locator('.hrefch');
  const count = await products.count();

  console.log('Total Products:', count);

  
});



//  Test 2: Add one product to cart
test('Add one product', async ({ page }) => {

  await page.click('.hrefch >> nth=0'); // first product

 await page.getByRole('link', { name: 'Add to cart' }).click();

 //handle popup or dialog
 page.on('dialog', dialog =>{

    console.log(dialog.message());
    dialog.accept();
 });

});

