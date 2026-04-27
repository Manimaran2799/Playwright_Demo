import { Actions } from '../Utils-Paperflite/Actions';

import { Assertions } from '../Utils-Paperflite/assertions';
export class Dashboard{

    //constructor
    constructor(page){
        this.page=page;
        
        this.collectiontab= page.locator("a[id='collections'] div[class='menu_icon__xFoqI'] svg");
        this.collectionheading= page.locator("a[id='collections'] div[class='menu_icon__xFoqI'] svg");
        this.settingstab=page.locator("//a[@id='settings']//div[@class='menu_icon__xFoqI']//*[name()='svg']");
        this.logouttext=page.getByText('Logout', { exact: true });


    }

    async navigateToCollections(){
        await Actions.click(this.collectiontab);
        await Assertions.shouldBeVisible(this.collectionheading);

    }
    async logout(){

        await Actions.click(this.settingstab);
        await Actions.click(this.logouttext);

    }
}