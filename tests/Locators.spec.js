const {test,expect}=require("@playwright/test");


test("Demo for the Locators",async({page})=>{

    await page.goto("");
    

   const  mostreadsection=page.locator("section[data-testid='illinois-section-outer-10']").locator("[data-testid='cambridge-card']");

   const textcontents=await mostreadsection.allTextContents();
   console.log(textcontents);


});



