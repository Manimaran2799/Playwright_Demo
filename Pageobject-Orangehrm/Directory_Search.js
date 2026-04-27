const { expect } = require("allure-playwright");
// @ts-check

//Before and after Emp searc ---->deletion
class Directory_Search{

        
  /** @param {import('@playwright/test').Page} page */
//constructor

constructor(page){

    this.page =page;
    this.directoryHeading=page.locator("//h5[normalize-space()='Directory']");
    this.empname=page.getByRole('textbox', { name: 'Type for hints...' });
    this.SearchBtndir=page.locator("button[type='submit']");

    //Employee card
    this.empcards=page.locator("div.orangehrm-directory-card");
    this.empcardname=page.locator("div.orangehrm-directory-card p.orangehrm-directory-card-header");
    this.invaliderrormess=page.locator("span.oxd-input-field-error-message");

    // this.page.locator(`//div[@role='option']//span[contains(text(),'${name}')]`)


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
 
async beforeDeleteSearch(userfirstname){
    await expect(this.directoryHeading).toBeVisible();
    await this.empname.fill(userfirstname);
    const option=this.page.locator(`//div[@role='option']//span[contains(text(),'${userfirstname}')]`).first();
    await expect(option).toBeVisible();
    await option.click();
    await this.SearchBtndir.click();
   await this.waitForReady();

    // Card counts
    await expect(this.empcards.first()).toBeVisible();
    await expect(this.empcards).toHaveCount(1);


    //card name check
    const empname = await this.empcardname.textContent();
    const firstname = empname.trim().split(' ')[0];
    expect(firstname).toBe(userfirstname);

}

async afterDeleteSearch(userfirstname){
     await expect(this.directoryHeading).toBeVisible({ timeout: 10000 });
    await this.empname.fill(userfirstname);
    const option=this.page.locator(`//div[@role='option']//span[contains(text(),'${userfirstname}')]`).first();
   await expect(option).not.toBeVisible();
    
    await this.SearchBtndir.click();
   await this.waitForReady();
    await expect(this.invaliderrormess).toBeVisible();
}
}

module.exports={Directory_Search};