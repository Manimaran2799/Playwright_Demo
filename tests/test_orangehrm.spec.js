const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../Pageobject-Orangehrm/Loginpage');
const { Headerpage } = require('../Pageobject-Orangehrm/Headerpage');
const { Employee_crud } = require('../Pageobject-Orangehrm/Employee_crud');
const { Directory_Search } = require('../Pageobject-Orangehrm/Directory_Search');
const { Myinfo } = require('../Pageobject-Orangehrm/Myinfo');
const { testdata_orangehrms } = require('../TestData-OrangeHRMS/testdata_orangehrms');


test.describe.serial('OrangeHRM Full Flow - Same Browser Same Session', () => {
 let context;
  let page;

  let loginPage;
  let headerpage;
  let employeecrud;
  let directorysearch;
  let myinfo;


  let empId;
  let currentuser;



  test.beforeAll(async ({ browser }) => {

    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    headerpage = new Headerpage(page);
    employeecrud = new Employee_crud(page);
    directorysearch = new Directory_Search(page);
    myinfo=new Myinfo(page);

    await page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    await loginPage.validLogin(
      testdata_orangehrms.validusername,
      testdata_orangehrms.validpwd
    );
    await expect(page).toHaveURL(/dashboard/);
  });

  test.afterAll(async () => {

    await headerpage.logout();

    await page.close();
    await context.close();
  });

  test(' @smoke @regression TestCase-001-Add Employee', async () => {

    empId = `CR-${Date.now().toString().slice(-4)}`;

    console.log('Generated Employee ID:', empId);

    
    const userdata=await employeecrud.getUsername();
    const currentuserfirstname= userdata[0];
    currentuser=userdata[1]; 

    await headerpage.navigatetoPIM();

    await employeecrud.verifyPIM();
  
    await employeecrud.addBasicempdetails(testdata_orangehrms.empfirstname,testdata_orangehrms.emplastname,empId,'Uploadfiles/Sample_A.jpg');
    await employeecrud.updatePersonalDetails(testdata_orangehrms.dob,'Uploadfiles/Sample_A.jpg');
    await employeecrud.updateJobdetails(testdata_orangehrms.joinedDate);
    await employeecrud.updateReporting(currentuserfirstname);
  });

  test('@smoke @regression TestCase-002-Search Employee', async () => {

    await employeecrud.SearchEmpCheck(empId);
  });

  test('@regression TestCase-003-Edit Employee', async () => {

  await employeecrud.EditEmployee(empId,testdata_orangehrms.updateddob);
  });

  test('@regression TestCase-004-Directory Search Before Delete', async () => {

  await headerpage.directorymodulenavigate();

  await directorysearch.beforeDeleteSearch(testdata_orangehrms.empfirstname);
  });

  test('@smoke @regression TestCase-005-Delete Employee on PIM ', async () => {

  await headerpage.navigatetoPIM();

  await employeecrud.deleteEmployee(empId);
  });

  test('@regression TestCase-006-Directory Search After Delete', async () => {

  await headerpage.directorymodulenavigate();

  await directorysearch.afterDeleteSearch(testdata_orangehrms.empfirstname);
  });

  test('@smoke @regression Testcase-007-Update My info',async()=>{

  await headerpage.navigatetoMyinfo();
  await myinfo.verifyMyinfo();
  await myinfo.verifycurrentuser(currentuser);
  await myinfo.updateInfo(testdata_orangehrms.updateddob,"Uploadfiles/Sample_B.jpg")
  });

});