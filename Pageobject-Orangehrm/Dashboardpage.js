
// @ts-check
class Dashboardpage{

    
  /** @param {import('@playwright/test').Page} page */
    //constructor
    constructor(page){

        this.page=page;
        this.sidemenulists=page.locator("ul.oxd-main-menu li");
        this.pimmodule=page.getByRole('link', { name: 'PIM' });
        this.directorymodule=page.getByRole('link',{name:'Directory'});
        this.myinfomodule=page.getByRole('link',{name:'My Info'});

        
    }

   async loginverify(){
    const count=await this.sidemenulists.count();

    for (let i = 0; i < count; i++) {
        const text=this.sidemenulists.nth(i).textContent();
        console.log(text);
        
    }

    
   }

   async pimnavigate(){

    await this.pimmodule.click();

   }

   async directorymodulenavigate(){
    await this.directorymodule.click();
   }

   async myinfonavigate(){
    await this.myinfomodule.click();
   }

}

module.exports={Dashboardpage};