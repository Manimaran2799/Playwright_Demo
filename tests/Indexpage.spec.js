
const {test}=require("@playwright/test");
const { Draft} = require('../Pageobject-Finzor/Draft');
const {Loginpage}=require("../Pageobject-Finzor/Loginpage");

test("Test -001", async({page})=>{

const loginpage=new Loginpage(page);
const draftpage=new Draft(page);

await loginpage.goto();
await loginpage.login("rohit@xyz.com","Pass@word1");

await draftpage.pdonei();
await draftpage.pdoneii();
await draftpage.pdtwoi();
await draftpage.pdtwoii();
await draftpage.addressdetailsoneI();
await draftpage.addressdetailsoneII();
await draftpage.addtaxtresident();
await draftpage.navigationtoproofidenpage();
await draftpage.otherdetailsonei();
await draftpage.otherdetialsonetwo();
await draftpage.otherdetailstwoone();
await draftpage.otherdetailstwotwo();
await draftpage.familydetailspage();
await draftpage.nomineedetailspage();
await draftpage.attestationdetailspage();
await draftpage.tdsinfo();
await draftpage.taxregispage();
await draftpage.facilitypage();
await draftpage.submitprocess();
await draftpage.unauthorizeflow();


}
);