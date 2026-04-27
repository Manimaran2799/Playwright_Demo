

const {test,expect}=require("@playwright/test");


test("Test for Handling Frames",async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

const Childframe=page.frameLocator("#courses-iframe");
await Childframe.getByRole('link', { name: 'NEW All Access plan' }).click();

const text=await Childframe.locator("div.text h2").textContent();
console.log(text.split(" ")[1]);

});
