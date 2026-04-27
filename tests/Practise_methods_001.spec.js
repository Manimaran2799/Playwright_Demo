
const {test, expect}=require('@playwright/test');
const { assert } = require('node:console');
const { title } = require('node:process');

test("Practise webdriver methods",async ({browser})=>
{
  const context =await browser.newContext();
const page=await  context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await console.log(page.title());
await expect(page).toHaveURL("https://rahulshettyacademy.com/loginpagePractise/");


//actions
await page.locator("input#username").fill("rahulshettyacademy ");
await page.locator("[name='password']").fill("JithishSharma");
await page.locator("[type='submit']").click();

console.log(await page.locator("[style*='block']").textContent());

await expect( page.locator("[style*='block']")).toContainText("Incorrect");



});