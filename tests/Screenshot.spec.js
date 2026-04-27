

const{test,expect}=require('@playwright/test');

test("Single Page",async ({page})=>{

    await page.goto("https://www.amazon.in/");
    await page.waitForTimeout(3000);
    await page.screenshot({path: 'tests/Screenshots/'+ Date.now()+"Homepage.png"});

});

test("Full page",async({page})=>{

    await page.goto("https://www.amazon.in/");
    await page.waitForTimeout(3000);
    await page.screenshot({path: "tests/Screenshots/"+ Date.now()+"Fullpage.png" ,fullPage :true});

});

test.only("Specific components",async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Amazon.in' }).screenshot({path: "tests/Screenshots/"+ Date.now()+"specific.png"});


});