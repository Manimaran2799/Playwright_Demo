
//importing the test from node modules
const {test,expect}=require('@playwright/test');




/*



1. Install Allure Commandline

Install globally using npm:

npm install -g allure-commandline --save-dev

Verify installation:

allure --version

2. Install Allure Reporter (for Playwright)

Install required package:

npm install -D allure-playwright


 3. Configure Allure in Playwright

Update playwright.config.js:

reporter: [
  ['line'],
  ['allure-playwright']
]


 4. Execute Test Cases

Run tests:

npx playwright test

Results will be stored in:

allure-results/


 5. Generate Allure Report

Generate report from results:

allure generate allure-results --clean -o allure-report

 6. Open Allure Report

Launch report in browser:

allure open allure-report
*/

test("first Script on Playwright",async ({browser})=>{   
    /*browser and page are fixtures available on playwright where it in-built 
    create obj for browser and pages etc...
    if we use browser we need to create new context like driver on selenium
*/
    



    const context =await  browser.newContext();
    const page= await context.newPage();
     await page.goto("https://www.cricbuzz.com/");

    console.log(await page.title());
    
    
     
});

test("second test without browser ",async ({page})=>{


   await page.goto("https://www.google.com/");

   console.log(await page.title());
   await expect(page).toHaveTitle("Google");

});