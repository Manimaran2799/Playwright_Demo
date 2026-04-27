
const{test,expect}=require('@playwright/test');


let page;
test.beforeEach(async ({browser})=>{

    page=await browser.newPage();
    
//launch the URL
    await page.goto("https://stage.finzorcbs.com/");
    await page.getByPlaceholder("Username").fill("rohit@xyz.com");
    await page.getByPlaceholder("Password").fill("Pass@word1");
    await page.getByRole("button",{name:'LOGIN'}).click();
});

test("Generic Individual Customer Creation ",async ({})=>{



//customer creation

await page.locator("div.justify-between div.w-max").filter({hasText :"CORPORATE"}).click();
await page.getByText("INDIVIDUAL").click();
await page.locator("div.justify-between div.w-max").filter({hasText :"CREATE NEW"}).click();
await page.locator("div.bg-modelBackground div.w-full").filter({hasText:"EXPRESS CUSTOMER"}).click();
await page.getByPlaceholder("Enter Customer Name").fill("Rohit");
await page.getByPlaceholder("Last Name").fill("Sharma");
await page.locator("//div[contains(@class,'relative w-full')]//following::div[text()='Select']").click();
await page.locator("ul.scrollbar-none li").getByText("DR").click();

await page.getByPlaceholder("Enter KYC Name").fill("Rohit Gurunath Sharma");
await page.locator('label').filter({ hasText: 'Aadhaar' }).click();
await page.getByPlaceholder("Enter Aadhaar Number").fill("585858123456");
await page.locator("div.justify-between span div").filter({hasText:"Select Customer Sub Type"}).click();
await page.getByText('Not Defined').click();
await page.getByRole("button",{name:"SUBMIT"}).click();
await page.getByRole("button",{name:"Yes"}).click();




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


  


})

test("Text print ",async({})=>{

    const sidemenu= page.locator("div.sidemenu-text");
    await expect(sidemenu.first()).toBeVisible();
    const count=await sidemenu.count();
    for (let i = 0;  i< count; i++) {
        const texts=await sidemenu.nth(i).textContent();
        console.log(texts);}

})

test.afterEach(async()=>{
    
     //logout
   await page.locator(".cursor-pointer span.text-xs").click();
   await page.locator('li:has-text("Logout")').click();

   await page.getByRole('button', { name: 'YES' }).click();
})