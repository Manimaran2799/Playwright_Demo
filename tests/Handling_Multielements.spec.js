

const {test,expect}=require('@playwright/test');
const { deserialize } = require('node:v8');


test("Handling Multiple Web Elements", async({page})=>{


    //Handling Hidden and displayed Behavior

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
  

} );
    


test("test_001", async ({ page }) => {
  await page.goto('https://stage.finzorcbs.com/');
  
  
  await page.getByRole('textbox', { name: 'Username' }).fill('rohit@xyz.com');
 
  await page.getByRole('textbox', { name: 'Password' }).fill('Pass@word1');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByText('CREATE NEW').click();
  await page.getByText('EXPRESS CUSTOMER').click();
  
  await page.getByRole('textbox', { name: 'Customer Name *' }).fill('Terroristone');

  await page.getByRole('textbox', { name: 'KYC Name *' }).fill('Terroristone');
  await page.locator('div').filter({ hasText: /^Select Customer Sub Type$/ }).nth(1).click();
  await page.getByText('NGO').click();
  await page.getByText('AADHAR NO').click();
 
  await page.getByRole('textbox', { name: 'Aadhaar No *' }).fill('123345635753');
  await page.getByRole('button', { name: 'SUBMIT' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.getByText('Terroristone')).toBeVisible();
  await expect(page.locator('tbody')).toContainText('Terroristone');
});

test("Test for Dialog box",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   
    page.on("dialog",dialog => dialog.dismiss());
   await page.locator("#confirmbtn").click();
});

