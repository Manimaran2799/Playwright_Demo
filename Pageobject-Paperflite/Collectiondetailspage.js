
import { Actions } from "../Utils-Paperflite/Actions";
import { Assertions } from "../Utils-Paperflite/assertions";


export class Collectiondetailspage{

    //constructor
    constructor(page){

        //add assets
        this.page=page;
        this.addassetsbtn=page.locator('button').filter({ hasText: 'Add Assets' }).first();
        this.assetsheading=page.getByRole('heading', { name: 'adding assets' });
        this.personaldrive=page.getByRole('heading', { name: 'Personal drives' });
        this.browsebtn=page.locator('span:has-text("Browse")');
         this.fileconfirmbtn=page.getByRole('button', { name: 'Confirm' });
        this.savechanges=page.locator('span').filter({ hasText: 'Save Changes' }).first();


        //link generation
        this.generatelinkbtn=page.locator("(//button[contains(@class,'actionbar_item')]//i[contains(@class,'actionbar_icon__ki32r paperflite-link')])[2]");
        this.headinggeneratelink=page.getByText('generate link', { exact: true });
        this.getlinkbtn=page.getByRole('button', { name: 'Get Link' });
        this.dialogboxclosebtn=page.locator('i.paperflite-close.tour_closeButton__Mibwc');
        this.settingsicon=page.locator('i.paperflite-settings-wheel');
        this.validatworkemail=page.getByText('Validate work email');
        this.setpwdtoggle=page.locator("//div[4]//div[2]//div[1]//div[1]//span[1]");
        this.setpwdfield=page.getByPlaceholder("Enter password");
        this.savebtn=page.locator("//div[contains(@class,'options_button')]//span[text()='Save']");
        this.errormessagepwd=page.locator("//div[contains(@class,'options_errorLabel')]//span[text()='Enter a valid password']");
        this.updatedlinkbtn=page.locator("div[class='options_updatedLink__heC9C col-xl-1 col-1'] i[role='button']");
        this.closebtnsidebar=page.locator('i.paperflite-close.generateLink_closeIcon__SIXLA');

}
       

    async addAssets(files){

        await Actions.click(this.addassetsbtn);
        await Assertions.shouldBeVisible(this.assetsheading);
        await Actions.hover(this.personaldrive);
        await this.page.locator('input[type="file"][multiple]').setInputFiles(files);
        await Actions.click(this.fileconfirmbtn);
        await Actions.click(this.savechanges);


    }
   
    async openGenerateLinkPopup(passwordvalue,errormesaage){

        await Actions.click(this.generatelinkbtn);
        await Assertions.shouldBeVisible(this.headinggeneratelink);
        await Actions.click(this.getlinkbtn);
        await Actions.click(this.dialogboxclosebtn);
        await Actions.click(this.settingsicon);
        await Actions.click(this.validatworkemail);
        await Actions.enableToggle(this.setpwdtoggle);
        await Assertions.shouldBeVisible(this.setpwdfield);
        await Actions.click(this.savebtn);
        await Assertions.shouldBeVisible(this.errormessagepwd);
        await Assertions.shouldHaveText(this.errormessagepwd,errormesaage);
        await Actions.fill(this.setpwdfield,passwordvalue);
        await Actions.click(this.savebtn);
    }
  
    async copyGeneratedLink(){

    await Actions.click(this.updatedlinkbtn);

    const link = await Actions.getCopiedText(this.page);
    console.log("Copied link:", link);
    await Actions.click(this.closebtnsidebar);

    return link;
    }
}