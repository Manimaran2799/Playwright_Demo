const { test, expect } = require('@playwright/test');
const path = require('node:path');

/*

simple things keep remember


getbylabel--->rb and ckboxes   ---->we can use for textboxes only when it was associated
getByplaceholder--->textboxes
getByroles--->btns
getBytext--->btns,textboxes


*/

//task -001:Parallel run of the Single File

// test.describe.configure({mode: 'serial'});
test(" @smoke test for Login", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://stage.finzorcbs.com/");

  const UN = page.getByPlaceholder('Username');
  const PWD = page.getByPlaceholder('Password');
  const loginBTN = page.getByRole('button', { name: 'LOGIN' });

  // Actions
  await UN.fill("rohit@xyz.com");
  await PWD.fill("Pass@word1");
  await loginBTN.click();
const sidemenu= page.locator("div.sidemenu-text");

 await expect(sidemenu.first()).toBeVisible();
const count=await sidemenu.count();
  for (let i = 0;  i< count; i++) {
    const texts=await sidemenu.nth(i).textContent();
    console.log(texts);}


    //await page.locator("div.cursor-pointer").nth(1).click();

    await page.locator("div.cursor-pointer").getByText("Corporate").click();
    await page.locator("div.cursor-pointer").getByText("INDIVIDUAL").click();

    await page.locator("div.cursor-pointer").getByText("CREATE NEW").click();

    await page.getByText("EXPRESS CUSTOMER").click();


    const Year="2021";
    const Mon="Jan";
   const Day="21";    

   const monthMap = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04",
  May: "05", Jun: "06", Jul: "07", Aug: "08",
  Sep: "09", Oct: "10", Nov: "11", Dec: "12"
};

   const expectedDate = `${Day}-${monthMap[Mon]}-${Year}`;
    await page.getByText("Select Date Of Birth").click();

    await expect(page.locator("div.react-datepicker")).toBeVisible();


   await page.getByText("YEAR").click();
   await page.locator("div.react-datepicker__year").getByText(Year).click();
   await page.locator("div.react-datepicker__month").getByText(Mon).click();
   await page.locator(`[aria-label*="January ${Day}"]`).click();
await expect(page.getByText(expectedDate)).toBeVisible();
});


test(" @regression Screenshots demo ", async({page})=>{


  await page.goto("https://stage.finzorcbs.com/");
  const UN = page.getByPlaceholder('Username');
  const PWD = page.getByPlaceholder('Password');
  const loginBTN = page.getByRole('button', { name: 'LOGIN' });
   await UN.fill("rohit@xyz.com");
  await PWD.fill("Pass@word1");
  await loginBTN.click();
  await page.screenshot({path:'Screenshot.png'});

  await page.getByRole('button', { name: 'LOGIN' }).screenshot({path:'Screenshot1.png'});


});


test("Visual ", async({page})=>{


  await page.goto("https://stage.finzorcbs.com/");
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
  /*

  where on the initial run page will capture the screenshot and on second run comparizon will happen
  */

});

module.exports={Finzor};