
import { Actions } from '../Utils-Paperflite/Actions';
import { Assertions } from '../Utils-Paperflite/assertions';
// @ts-check

export class Shareddetailspage{

    /**
   * @param {import('@playwright/test').Page} page
   */

    //constructor
    constructor(page){

        this.page =page;
        this.incognitousername=page.getByPlaceholder("Please enter your email here");
        this.incognitocotinuebtn=page.locator("//button[@type='submit']");
        this.incogpwdfield=page.getByPlaceholder("Enter password");
        this.header=page.locator("h2");
        this.cards=page.locator("//div[contains(@class,'card_card__mcon4')]");
        this.cardsname = this.cards.locator(
        "xpath=.//div[contains(@class,'card_cardContent')]//span[contains(@class,'card_name')]"
);

    }


    async incognitologin(username,password){
        await Actions.fill(this.incognitousername,username);
        await Actions.click(this.incognitocotinuebtn);
        await Actions.fill(this.incogpwdfield,password);
        await Actions.click(this.incognitocotinuebtn);
    }

     async fetchAssetCount() {

        await Assertions.shouldBeVisible(this.header);
        
        const assetscounts=await Actions.getCount(this.cards);
        return assetscounts;
  }
    async fetchAssetNames() {
    
    return await Actions.getAllTexts(this.cardsname);

  }

 
}