const { expect } = require('@playwright/test');

class Headerpage{

     /** @param {import('@playwright/test').Page} page */
    //constructor
    constructor(page){

        this.page=page;
        this.profileDD=page.locator("//span[@class='oxd-userdropdown-tab']");
        this.logoutoption=page.getByRole("menuitem",{name:"Logout"});
        this.pimmodule=page.getByRole('link', { name: 'PIM' });
        this.directorymodule=page.getByRole('link',{name:'Directory'});
        this.myInfomodule=page.getByRole('link',{name:"My Info"});
    }


    async logout(){
        await this.profileDD.click();
        await this.logoutoption.click();
        await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }

    //navigation

    async navigatetoPIM(){
        await this.pimmodule.click();
    }

    
   async directorymodulenavigate(){
    await this.directorymodule.click();
   }

   async navigatetoMyinfo(){
    await this.myInfomodule.click();
   }
}

module.exports={Headerpage};