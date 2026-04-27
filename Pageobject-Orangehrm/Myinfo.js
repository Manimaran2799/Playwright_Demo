const { expect } = require('@playwright/test');
const path = require('path');

//update the admin Details
class Myinfo{
/** @param {import('@playwright/test').Page} page */
    //constructor
    constructor(page){

        this.page=page;
        this.myInfoheading=page.getByRole('heading', { name: 'Personal Details' });
        this.dob=page.locator("//label[text()='Date of Birth']//ancestor::div[contains(@class,'oxd-input-field-bottom-space')]//input");
         this.attachbutton=page.getByRole('button', { name: 'Add' })
        
        this.deletedialogtext=page.locator("//div[@role='document']//p[contains(@class,'text--card-body')]");
        this.YesDeleteBTN=page.getByRole('button', { name: 'Yes, Delete' });
        this.deletetoastermessage=page.locator("div.oxd-toast-start p").nth(1);
        this.saveBTN=page.locator('button').filter({ hasText: 'Save' }).first();
        

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

    async verifyMyinfo(){
        await this.waitForReady();
        await expect(this.myInfoheading).toBeVisible();

    }

    async verifycurrentuser(currentuser){
        await expect(this.page.locator(`//h6[normalize-space()='${currentuser}']`)).toBeVisible();
        
    }

    async updateInfo(updateddob,file){
        await this.dob.fill(updateddob);
        await this.saveBTN.click();
        await this.waitForReady();
        await this.attachbutton.click();
        await this.page.locator("div.oxd-input-group").locator("//input[@type='file']").setInputFiles(file);
        await this.page.locator('button').filter({ hasText: 'Save' }).last().click();
        await this.waitForReady();
      
        const fileName = path.basename(file);
        await expect(this.page.getByText(fileName)).toBeVisible();
        await this.page.locator('.oxd-table-card').filter({ hasText: fileName }).first().getByRole('button').nth(1).click();
        await expect(this.deletedialogtext).toBeVisible();
        await this.YesDeleteBTN.click();
        await this.waitForReady();
        await expect(this.deletetoastermessage).toBeVisible({ timeout: 10000 });

     

    }

}
module.exports={Myinfo};