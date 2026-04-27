const { expect } = require("@playwright/test");
const { count } = require("node:console");

/** @param {import('@playwright/test').Page} page */
class Orderhistory{

    //constructor
    constructor(page){

        this.page=page;
        this.row=page.locator("tbody tr");
        this.orderIDSummary=page.locator("div.col-text");
        this.orderSummaryText = page.getByText("Order Summary");
        
    }

    async orderCheck(orderId){
    const rowcount=await this.row.count();
    for (let i = 0; i < rowcount; i++) {
    const ID = (await this.page.locator("tbody tr th").nth(i).textContent()).trim();
    if (ID === orderId) {
      await this.row.nth(i).locator("button:has-text('View')").click(); 
      break;}
    }
    }

    async finalValidation(orderId){
            await expect(this.orderSummaryText).toBeVisible();
            await expect(this.orderIDSummary).toHaveText(orderId);
    }
}
module.exports = {Orderhistory};