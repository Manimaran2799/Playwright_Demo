
const {test,expect}=require('@playwright/test');

const {LoginPage}=require('../Pageobject-Orangehrm/Loginpage');
const {Headerpage}=require('../Pageobject-Orangehrm/Headerpage');
const { testdata_orangehrms } = require('../TestData-OrangeHRMS/testdata_orangehrms');

test.describe("Login-Full flow",()=>{
 
  let loginPage;
  let headerpage;


    test.beforeEach(async({page})=>{
    

        loginPage = new LoginPage(page);
        headerpage = new Headerpage(page);

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    })


    test("@regression  inValid Login",async({page})=>{
        await loginPage.invalidLogin(testdata_orangehrms.invalidusername, testdata_orangehrms.invalidpwd)

    })

    test("@smoke Valid Login",async({page})=>{

        await loginPage.validLogin( testdata_orangehrms.validusername,testdata_orangehrms.validpwd);
        await expect(page).toHaveURL(/dashboard/);
    })

    test("@smoke logout functionality", async({page})=>{
        await loginPage.validLogin( testdata_orangehrms.validusername,testdata_orangehrms.validpwd);
        await expect(page).toHaveURL(/dashboard/);
        await headerpage.logout();
        await expect(page).toHaveURL(/login/);

    })

});