
//create,search,update,delete

const { expect } = require('@playwright/test');
const { count } = require('node:console');

class Employee_crud{

   
    //constructor
    /** @param {import('@playwright/test').Page} page */

    constructor (page){
        this.page =page;
        this.currentusername=undefined;
        this.pimtitle=page.getByRole('heading', { name: 'PIM' });

        this.username=page.locator("//span[@class='oxd-userdropdown-tab']//p");


        //add Employee
        this.addemp=page.getByRole('link', { name: 'Add Employee' });
        this.addempheading=page.getByRole('heading', { name: 'Add Employee' });

        this.firstname=page.getByPlaceholder('First Name');
        this.lastname=page.getByPlaceholder('Last Name');

        this.empid=page.locator("//div[contains(@class,'oxd-input-field-bottom-space')]//input[@class='oxd-input oxd-input--active']");

        this.savebtn=page.getByRole('button', { name: 'Save' });


        //Employee List
        this.employeelisttab=page.getByRole('link', { name: 'Employee List' });
        this.nationalityDD=page.locator("//label[text()='Nationality']/ancestor::div[contains(@class,'label-wrapper')]//following-sibling::div");
        this.nationoption=page.getByRole("option", {name:'Afghan'});
        this.maritalDD=page.locator("//label[text()='Marital Status']/ancestor::div[contains(@class,'label-wrapper')]//following-sibling::div");
        this.maritaloption=page.getByRole("option",{name:'Single'});
        this.genderoption=page.locator("//label[normalize-space()='Male']");
        this.dob=page.locator("//label[text()='Date of Birth']//ancestor::div[contains(@class,'oxd-input-field-bottom-space')]//input");
        this.BloodtypeDD=page.locator("//label[text()='Blood Type']/ancestor::div[contains(@class,'label-wrapper')]//following-sibling::div")
        this.bloodtypeoption=page.getByRole('option',{name:'A+'})
        this.attachbutton=page.getByRole('button', { name: 'Add' })
        this.browsebtn=page.locator("//div[@class='oxd-file-button']");
        this.addedfileverify=page.getByRole("row");



        //job page
        this.jobpage=page.getByRole('link', { name: 'Job' });
        this.jobdetailsheading=page.getByRole('heading', { name: 'Job Details' });
        this.joineddatebox= page.locator("//label[text()='Joined Date']//ancestor::div[contains(@class,'oxd-input-field-bottom-space')]//input")
        this.jobtitle=page.locator("//label[text()='Job Title']/ancestor::div[contains(@class,'label-wrapper')]//following-sibling::div")
        this.joboption=page.getByRole("option", {name:'Automaton Tester'});

        this.subunitDD=page.locator("//label[text()='Sub Unit']/ancestor::div[contains(@class,'label-wrapper')]//following-sibling::div")
        this.subunitoption=page.getByRole("option",{name: 'Quality Assurance'});
        this.locDD=page.locator("//label[text()='Location']/ancestor::div[contains(@class,'label-wrapper')]//following-sibling::div");
        this.locOption=page.getByRole("option",{name:'velachery Office'})
        this.empstatus=page.locator("//label[text()='Employment Status']/ancestor::div[contains(@class,'label-wrapper')]//following-sibling::div")
        this.empstatusoption=page.getByRole("option",{name:'Freelance'});


        //Report to 
        this.reportto=page.getByRole('link', { name: 'Report-to' });
        this.reporttoHeading=page.getByRole('heading', { name: 'Report to' });
        this.attachBtnReporting=page.locator("//div[@class='orangehrm-action-header']//h6[text()='Assigned Subordinates']//following-sibling::button");


        this.reportingmethodDD=page.locator("//label[text()='Reporting Method']/ancestor::div[contains(@class,'label-wrapper')]//following-sibling::div")
        this.reportingmethodOption=page.getByRole("option",{name:'Direct', exact: true });

        this.supervisorname=page.getByRole('textbox', { name: 'Type for hints...' })
       

        //Employee Search list --->
        this.employeelistheading=page.getByRole('heading', { name: 'Employee Information' });
        this.employeenameCheck=page.locator("//label[text()='Employee Name']//ancestor::div[contains(@class,'group__label-wrapper')]//following-sibling::div")
        this.empIDCheck=page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
        this.searchBtn=page.getByRole('button', { name: 'Search' });

        //savebutton
        this.savecusdetailsbtn=page.locator("//div[@class='orangehrm-custom-fields']//button");

        //delete
        this.deletedialogtext=page.locator("//div[@role='document']//p[contains(@class,'text--card-body')]");
        this.YesDeleteBTN=page.getByRole('button', { name: 'Yes, Delete' });
        this.deletetoastermessage=page.locator("div.oxd-toast-start p").nth(1);

        //Toaster message
        this.successupdatemessage=page.locator("div.oxd-toast-start p.oxd-text--toast-message");
        //personal details -- top section,Job -- top section,
        this.successsavedmessage=page.locator("//div[@class='oxd-toast-start'] //p[text()='Successfully Saved']");
        // Emp basic details added,attachment added on the personal details --bottom section,Job-attach section,Reporting to -- top section



        

    }

    async verifyPIM(){
        await  expect(this.pimtitle).toBeVisible();

    }

   async getUsername() {
   const currentusername = await this.username.textContent();

   const parts=currentusername.trim().split(' ');
   return  [parts[0], currentusername.trim()];
}

async waitForReady() {
  await this.page.waitForLoadState('networkidle');

  const loader = this.page.locator('.oxd-form-loader');

  if (await loader.count() > 0) {
    await loader.waitFor({
      state: 'hidden',
      timeout: 10000
    });
  }
}
   

    async addBasicempdetails(fname,lname,empIDinput,file){

        await this.addemp.click();
        await expect(this.addempheading).toBeVisible();

        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.empid.fill(empIDinput);

        await this.page.locator("//input[@type='file']").setInputFiles(file);

        await this.savebtn.click();
        await this.waitForReady();

        await expect(this.successsavedmessage).toBeVisible();

        console.log(
            "Emp Basic details was " +
            await this.successsavedmessage.textContent()
  );
}
        //<-----------------Employee list page------------->
       async updatePersonalDetails(dob,file){

            await this.waitForReady();

            await this.nationalityDD.click();
            await this.nationoption.click();

            await this.maritalDD.click();
            await this.maritaloption.click();

            await this.dob.fill(dob);

            await this.genderoption.click();

            await this.attachbutton.click();

            await this.page
                .locator("div.oxd-input-group")
                .locator("//input[@type='file']")
                .setInputFiles(file);

            await this.page
                .locator('button')
                .filter({ hasText: 'Save' })
                .last()
                .click();

            await this.waitForReady();

            await expect(this.successsavedmessage).toBeVisible();

            console.log(
                "Attachment uploaded: " +
                await this.successsavedmessage.textContent()
            );
}
        
        

        //<-----------------job page---------------->

       async updateJobdetails(joineddateinput){

            await this.jobpage.click();
            await this.waitForReady();

            await this.joineddatebox.fill(joineddateinput);

            await this.jobtitle.click();
            await this.joboption.click();

            await this.subunitDD.click();
            await this.subunitoption.click();

            await this.locDD.click();
            await this.page.locator("//div[@role='option']").nth(3).click();

            await this.savebtn.click();
            await this.waitForReady();

            await expect(this.successupdatemessage).toBeVisible();

            console.log(
                "Job page updated: " +
                await this.successupdatemessage.textContent()
  );
}


        //<---------------------Reporting to------------------>

        async updateReporting(currentuser){

                await this.reportto.click();
                await this.waitForReady();

                await this.attachBtnReporting.click();

                await this.reportingmethodDD.click();
                await this.reportingmethodOption.click();

                await this.supervisorname.fill(currentuser);

                const optionusername =
                    this.page.getByRole('option', { name: currentuser }).first();

                await expect(optionusername).toBeVisible({ timeout: 10000 });

                await optionusername.click();

                await this.savebtn.click();
                await this.waitForReady();

                await expect(this.successupdatemessage).toBeVisible();

                console.log(
                    "Reporting updated: " +
                    await this.successupdatemessage.textContent()
  );
}

    async SearchEmpCheck(empIDinput){
        await this.employeelisttab.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.employeelistheading).toBeVisible({ timeout: 10000 });

        await this.empIDCheck.fill(empIDinput);
        await this.searchBtn.click();
        await this.waitForReady();
        const rows = this.page.locator('div.oxd-table-card');
        await expect(rows.first()).toBeVisible();
        const countofrow = await rows.count();
        expect(countofrow).toBeGreaterThan(0);
        await expect(this.page.locator(`//div[contains(@class,'oxd-padding-cell')]//div[text()='${empIDinput}']`)).toBeVisible();
    }


    //edit 

    async EditEmployee(empIDinput,editeddob){
        await this.employeelisttab.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.employeelistheading).toBeVisible({ timeout: 10000 });

        await this.empIDCheck.fill(empIDinput);
        await this.searchBtn.click();
        await this.waitForReady();
        await this.page.locator('div.oxd-table-card').filter({hasText:empIDinput}).locator('button').nth(0).click();


        //<--------------edit page------------------------->
        await expect(this.page.getByRole('link', { name: 'Personal Details' })).toBeVisible();
        await this.dob.fill(editeddob);
        // await this.BloodtypeDD.click();
        // await this.bloodtypeoption.click();
        await this.savecusdetailsbtn.click();

        //edited toaster is displayed 
        await this.waitForReady();
        await expect(this.page.locator("//p[text()='Successfully Saved']")).toBeVisible();
        await console.log("Employee details was edited "+ this.successsavedmessage.textContent());
    }

    //delete 

    async deleteEmployee(empIDinput){
        await expect(this.employeelistheading).toBeVisible();
        await this.empIDCheck.fill(empIDinput);
        await this.searchBtn.click();
        await this.page.locator('div.oxd-table-card').filter({hasText:empIDinput}).locator('button').nth(1).click();
        await expect(this.deletedialogtext).toBeVisible();
        await this.YesDeleteBTN.click();
        await this.waitForReady();

        //checking delete toaster is displayed
        await expect(this.deletetoastermessage).toBeVisible({ timeout: 10000 });
        await console.log("Employee Details was deleted "+this.deletetoastermessage.textContent());

    }


}

module.exports={Employee_crud};