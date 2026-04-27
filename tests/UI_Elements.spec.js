


const {test}=require('@playwright/test');

test("",async({browser})=>{
    const context=browser.newContext();

   const page=await context.newPage();

   await page.locator("#username").fill("beast@yopamil.com");
   await page.locator("#password").fill("Pass@123");
   await page.locator("[name='radio']").nt
});