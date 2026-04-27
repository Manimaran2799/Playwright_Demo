
import { Actions } from '../Utils-Paperflite/Actions';
import { Assertions } from '../Utils-Paperflite/assertions';

export class Conversation {

  constructor(page){

    this.page = page;

    this.conversationtag = page.locator("//a[@id='conversations']//div[@class='menu_icon__xFoqI']//*[name()='svg']");
    this.collectionlistselection=page.locator("//div[contains(@class,'conversationList_subject__')]//div[contains(@class,'conversationList')]");//selection
    this.collectiontitleafterselection=page.locator("div[class='conversationDetail_headerContainer__-oUDt'] div div:nth-child(1)");//title check
    this.receipt = page.locator("div.recipients_profileInfo__bG-NZ.col-xxl-4.col-xl-4");//receipt
    this.headingconactivity = page.getByRole('heading', { name: 'conversation activity' });//check connectivity heading
    this.convocollectionlist=page.locator("p"); 
    this.assets = page.locator('[class*="assetShare_content"]');//assets
    this.assetNames = page.locator('//div[contains(@class,"assetShare_content")]//div[contains(@class,"LinesEllipsis")]');
    this.emailverify = page.locator("(//div[contains(@class,'contact_contactInfo')]//span)[1]");//email
    this.closeicon = page.locator('i.paperflite-close.contact_closeIcon__ZQrRo');
    this.deletebtn = page.locator('i.actionbar_icon__ki32r.paperflite-delete');
    this.deleteheading = page.locator('div.slider_header__1IeY5.delete_header__25Gto');
    this.confirmbtn = page.getByText('confirm', { exact: true });


  }

  async searchCollection(collectionname){

    await Actions.click(this.conversationtag);
    await this.page.getByRole('link', { name: collectionname }).click();
   
    await Assertions.shouldContainText(this.collectiontitleafterselection,collectionname);
    await Actions.click(this.receipt);
    await Assertions.shouldBeVisible(this.headingconactivity);
    const locator2=await this.convocollectionlist.filter({hasText:collectionname});
    await Actions.click(locator2);


  }

     async fetchAssetCount(){
    return await Actions.getCount(this.assets);
  }

  async fetchAssetNames(){
    return await Actions.getAllTexts(this.assetNames);
  }

   
   async verifyUserEmail(username){ 
    await Assertions.shouldHaveText(this.emailverify, username);
  }

  async deleteConversation(){

    await Actions.click(this.closeicon);
    await Actions.click(this.deletebtn);
    await Assertions.shouldBeVisible(this.deleteheading);
    await Actions.click(this.confirmbtn);
  }
}