
import { Actions } from '../Utils-Paperflite/Actions';
import { Assertions } from '../Utils-Paperflite/assertions';

export class Collectionpage{
//constructor

    constructor(page){

        //locators
        this.page=page;
        this.createcollectionbtn=page.getByRole('button', { name: 'Create new collection' });
        this.collectionheading=page.getByRole('heading', { name: 'creating new collection' });
        this.addcollectionbox=page.getByPlaceholder('Add a collection name');
        this.nextbtn=page.getByText('Next', { exact: true });
        this.chooseexptext= page.locator('span:has-text("Choose experience")');
        this.experirenceselection=page.getByText('Metro', { exact: true });
        this.viewer=page.getByText('Choose Viewer', { exact: true });
        this.confirmbtn=page.getByRole('button', { name: 'Confirm' });
        this.collectiontab= page.locator("a[id='collections'] div[class='menu_icon__xFoqI'] svg");
        this.searchboxincollection=page.locator("div.actionbar_item__ifg1k.actionbar_searchBar__x2ixb form input");
        this.deletebtnbefore=page.locator('div.actionbar_row__zKMkW').locator('button').nth(2);
        this.selectedcollection=page.locator('div.LinesEllipsis.card_name__FGjNa');
        this.deletebtnafter=page.getByRole('button', { name: 'Delete' });
        this.deleteheading=page.getByRole('heading', { name: 'deleting...' });
        this.deleteconfirmbtn=page.getByRole('button', { name: 'Confirm' });

    }

    async createCollection(collectionname){

        await Actions.click(this.createcollectionbtn);
        await Assertions.shouldBeVisible(this.collectionheading);
        await Actions.fill(this.addcollectionbox,collectionname);
        await Actions.click(this.nextbtn);
        await Assertions.shouldBeVisible(this.chooseexptext);
        await Actions.click(this.experirenceselection);
        await Actions.click(this.nextbtn);
        await Assertions.shouldBeVisible(this.viewer);
        await Actions.click(this.confirmbtn);
        await Assertions.shouldBeVisible(this.page.getByRole('heading', {name: `${collectionname}`}))

    }

    async deleteCollection(collectionname){

    await Actions.click(this.collectiontab);
    await Actions.fill(this.searchboxincollection,collectionname);
    await this.searchboxincollection.press('Enter');
    
    await Actions.click(this.deletebtnbefore);
    await this.page.waitForLoadState('networkidle');

   const locator = this.page.locator(
   `//a[.//div[normalize-space()='${collectionname}']]`
   );
   
    await Actions.click(locator);

    await Actions.click(this.deletebtnafter);
    await Assertions.shouldBeVisible(this.deleteheading);
    await Actions.click(this.deleteconfirmbtn);

}

}