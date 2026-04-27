// @ts-check
import { expect } from '@playwright/test';
import { convertProcessSignalToExitCode } from 'node:util';

class Draft {

  /**
   * @param {import('@playwright/test').Page} page
   */

 

  constructor(page) {

    this.page = page;

    this.refId = undefined;
    // Navigation
    this.CusTypeDD = page.locator("div.cursor-pointer").getByText("Corporate");
    this.Invoption = page.locator("div.cursor-pointer").getByText("INDIVIDUAL");
    this.createnewBTN = page.locator("div.cursor-pointer").getByText("CREATE NEW");
    this.generic = page.getByText("GENERIC CUSTOMER");

    // PD-1
    this.invTitle = page.getByText("Individual Customer");

    this.salutationDD = page.locator("//div[@class='mb-1' and contains(.,'Customer Name')]//following-sibling::div");
    this.salutationoption = page.locator("div.text-wrap ul li").getByText("DR");

    this.cusfirstname = page.getByPlaceholder("First Name");
    this.cuslastname = page.getByPlaceholder("Last Name");

    this.nationDD = page.locator("//div[@class='mb-1' and contains(.,'Nationality')]//following-sibling::div");
    this.nationoption = page.locator("div.text-wrap ul li").getByText("India");

    this.kycname = page.locator("//input[@id='KYC Name']");

    this.dob = page.locator("//div[@class='custom-date-input-container relative' and contains(.,'Date Of Birth')]//following-sibling::div[contains(.,'Select')]");

    this.verificationDD = page.locator("//div[@class='mb-1' and contains(.,'Verification Type')]//following-sibling::div");
    this.verifyoption = page.getByText("Aadhaar");

    this.aadharfield = page.locator("//input[@id='UID / Aadhaar No']");

    this.saveandcontinueBTN = page.locator("//button[@type='button' and contains(.,'SAVE & CONTINUE')]");

    // PD-1-II
    this.pdoneiitext = page.getByText("PERSONAL DETAILS 1 - II");

    this.homebranch = page.locator("//input[@id='Customer Home Branch']");

    this.capturesource = page.locator("//div[@class='mb-1' and contains(.,'Capture Source')]//following-sibling::div");
    this.captureoption = page.getByText("BranchWalk-In");

    this.residency = page.locator("//div[@class='mb-1' and contains(.,'Residency')]//following-sibling::div");
    this.residencyoption = page.getByText("Foreign National");

    this.saveandnext = page.getByRole("button", { name: 'SAVE & NEXT' });

    // PD-2-I
    this.gender = page.locator("//div[@class='mb-1' and contains(.,'Gender')]//following-sibling::div");
    // this.gender=page.getByLabel("Gender").locator("..").getByText("Select");

    // this.gender=page.locator('text=Gender').locator("..").locator("div").filter({hasText:"Select"});
    this.genderoption = page.getByText('Male', { exact: true });

    this.countrybirth = page.locator("//div[@class='mb-1' and contains(.,'Country Of Birth')]//following-sibling::div");
    this.countryoption = page.locator("//li[text()='India']");

    this.marital = page.locator("//div[@class='mb-1' and contains(.,'Marital Status')]//following-sibling::div");
    this.maritaloption = page.getByText("Single");

    this.relatedpersontype = page.locator("//div[@class='mb-1' and contains(.,'Related Person Type')]//following-sibling::div");
    this.relatedoption = page.getByText("GUARDIAN OF MINOR");

    this.guardianselect = page.locator("//button[@type='button' and contains(.,'SELECT')]");

    this.custable = page.locator(".data_table");
    this.cusoption = page.locator("(//tbody//tr)[5]");

    // PD-2-II
    this.aadharcheckbox = page.getByText("AADHAAR");
    this.aadhartextfieldpd2 = page.locator("//input[@id='Aadhaar Number']");

    //Address details
    //AD-1
    this.residentype=page.locator("//div[@class='mb-1' and contains(.,'Resident Type')]//following-sibling::div");
    this.residentoption=page.getByText("Rented");
    // this.pincode=page.getByRole('textbox', { name: 'Pin Code *' })

    this.pincode=page.locator("//input[@id='Pin Code']");
    this.country=page.locator("//input[@id='Country']");
    this.state=page.locator("#State");
    this.district=page.locator("#District");
    this.streetandroad=page.getByPlaceholder("Enter Street and Road");
    this.flatandbuilding=page.getByPlaceholder("Enter Flat And Building");
    this.postalarea=page.locator("//div[@class='mb-1' and contains(.,'Postal Area')]//following-sibling::div");
    this.postaloption=page.getByText("Raja Annamalaipuram");
    this.addrproof=page.locator("//div[@class='mb-1' and contains(.,'Address Proof')]//following-sibling::div");
    this.proofoption=page.locator("//li[text()='Aadhaar']");
    this.docno=page.locator("//input[@id='Document No']");

    //AD-I-II
    this.mailid=page.getByPlaceholder("Enter Email Address");
    this.contacttype =page.locator("//div[@class='mb-1' and contains(.,'Contact Type')]//following-sibling::div");
    this.contactoption=page.getByText("Mobile No");
    this.contactnumber=page.getByPlaceholder("Enter Contact Details");
    
    //tax resident
    this.taxresidentbtn=page.getByRole("button",{name: "ADD TAX DETAILS"});
    this.countrytaxDD=page.locator("//div[@class='mb-1' and contains(.,'Country')]//following-sibling::div");
    this.countryoptionTax=page.locator("div.text-wrap ul li").getByText("India");
    this.taxtype=page.locator("//div[@class='mb-1' and contains(.,'Tax Type')]//following-sibling::div");
    this.taxoption=page.locator("div.text-wrap ul li").getByText("GST");
    this.taxid=page.locator("input[id='Tax ID']");
    this.effectivefrom=page.locator("//div[contains(@class,'custom-date-input') and contains(.,'Effective From')]//following-sibling::div");
    this.saveBTN=page.getByRole("button", {name:"SAVE"});

    //Proofof Identity
    this.newdocBTN=page.getByRole("button",{name:"ADD NEW DOCUMENT"});

   //othersdetails-1-1
   this.riskrating=page.locator("//div[@class='mb-1' and contains(.,'AML Customer Risk Rating')]//following-sibling::div")
  this.riskratingoption=page.locator("div.text-wrap ul li").getByText("Medium");

  //otherdetails-1-2
  this.ratingdate=page.locator("//div[contains(@class,'custom-date-input') and contains(.,'KYC Rating Date')]//following-sibling::div");

  //otherdertails-2-1
  this.directorcheckbox=page.locator("//div[@class='mb-5' and normalize-space()='Director']/following-sibling::div//span").getByText("YES");
  this.relateddirectorchkbox=page.locator("//div[@class='mb-5' and normalize-space()='Related To Director']/following-sibling::div");


  //familydetails page
  this.familydetailbtn=page.getByRole("button",{name:"Add Family Details"});

  //nominee details page
this.nomineedetailbtn=page.getByRole('button', { name: 'Add Nominee Details' })

//attestation detial-1
this.kycdeclaration=page.locator("div label").getByText("KYC Declaration Date");

//TDS info


 this.appliedfor=page.locator("//div[@class='mb-1' and contains(.,'Applied For')]//following-sibling::div");
 this.appliedforoption=page.locator("div.text-wrap ul li").getByText("None");
 
this.tdsreasoncode=page.locator("//div[@class='mb-1' and contains(.,'TDS Reason Code')]//following-sibling::div");
this.reasoncodeoption=page.locator("div.text-wrap ul li").getByText("Member");

this.effectivedate=page.locator("div.custom-date-input-container span.custom-placeholder");


//tax registration
this.addtaxregisbtn=page.getByRole("button",{name:"Add Tax Registration"});

//facilities
this.facilitytable=page.locator("table tbody");

//otherbankdetails
this.nomineedetailbtn=page.getByRole("button",{name:"Add Bank Details"});



//Submit process
this.submitbtn=page.getByRole("button",{name:"SUBMIT"});

//text for ref no
this.successmessage=page.locator("//div//p[contains(.,'REFIND')]");

//yes button
this.yesbuttonsubmit=page.getByRole("button",{name:"Yes"});

//unauthorize page components
this.unauthorizepagecheck=page.locator("tbody tr").locator("td");

//authorize button
this.groupinbox=page.getByText("Group Inbox");
this.authorizebtn=page.getByRole("button",{name:"AUTHORIZE"});
   

  }

  // 🔥 Random Name (fixed)
  randomName(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  // PD-1
  async pdonei() {

    const firstname = this.randomName(6);

    await this.CusTypeDD.click();
    await this.Invoption.click();
    await this.createnewBTN.click();
    await this.generic.click();

    await this.salutationDD.click();
    await this.salutationoption.click();

    await this.cusfirstname.fill(firstname);
    await this.cuslastname.fill(firstname);

    await this.nationDD.click();
    await this.nationoption.click();

    await this.kycname.fill("Rohit Sharma");

    await this.dob.click();

    await this.page.getByText("YEAR").click();
    await this.page.locator("div.react-datepicker__year").getByText("2021").click();
    await this.page.locator("div.react-datepicker__month").getByText("Jan").click();
    await this.page.locator(`[aria-label*="January 21"]`).click();

    await this.verificationDD.click();
    await this.verifyoption.click();

    await this.aadharfield.fill("123456789012");

    await this.saveandcontinueBTN.click();
  }

  // PD-1-II
  async pdoneii() {

    await expect(this.pdoneiitext).toBeVisible();

    const hbtext = await this.homebranch.inputValue();
    await expect(hbtext).toBe("Main Branch - Mumbai");

    await this.capturesource.click();
    await this.captureoption.click();

    await this.residency.click();
    await this.residencyoption.click();

    await this.saveandnext.click();
  }

  // PD-2-I
  async pdtwoi() {

    await this.gender.click();
    await this.genderoption.click();

    await this.countrybirth.click();
    await this.countryoption.click();

    await this.marital.click();
    await this.maritaloption.click();

    await this.relatedpersontype.click();
    await this.relatedoption.click();

    await this.guardianselect.click();

    await expect(this.custable).toBeVisible();
    await this.cusoption.click();

    await this.saveandcontinueBTN.click();
  }

  // PD-2-II
  async pdtwoii() {

    await this.aadharcheckbox.click();

    await expect(this.aadhartextfieldpd2).toBeVisible();
    await this.aadhartextfieldpd2.fill("123456789012");

    await this.saveandnext.click();
  }

  async addressdetailsoneI(){

    await this.residentype.click();
    await this.residentoption.click();
    await this.pincode.fill("600028");
    
   
   await this.page.waitForLoadState('networkidle');
   await expect(this.country).toHaveValue("India");

   await this.streetandroad.fill("17, TVM, Kamaraj Street");
   await this.flatandbuilding.fill("Brownstone appartment");
   await this.postalarea.click();
   await this.postaloption.click();

   await this.addrproof.click();
   await this.proofoption.click();
   await this.docno.fill("123456789012");
    await this.saveandcontinueBTN.click();

  }

  async addressdetailsoneII(){

    await this.mailid.fill("mail@gmail.com");
    await this.contacttype.click();
    await this.contactoption.click();
    await this.contactnumber.fill("9999999999");
    await this.saveandnext.click();

  }

 async addtaxtresident() {

  const taxId = "TAX" + Date.now().toString().slice(-10);

  await this.taxresidentbtn.click();
  await this.countrytaxDD.click();
  await this.countryoptionTax.click();
  await this.taxtype.click();
  await this.taxoption.click();
  await this.taxid.fill(taxId);

  await this.effectivefrom.click();
  await this.page.getByText("YEAR").click();
  await this.page.locator("div.react-datepicker__year").getByText("2021").click();
  await this.page.locator("div.react-datepicker__month").getByText("Jan").click();
  await this.page.locator(`[aria-label*="January 21"]`).click();

  await this.saveBTN.click();

  // const confirmmessage = await this.page.locator("div.justify-between p").textContent();
  // console.log(confirmmessage);

  // await this.page.locator("div.justify-between button").getByText("Yes").click();

  const newRow = this.page.locator("tbody tr").filter({
    has: this.page.locator("td", { hasText: taxId })
  });

  await expect(newRow).toBeVisible();
 await this.saveandnext.click();
}

async navigationtoproofidenpage(){
await expect(this.newdocBTN).toBeVisible();
  await this.saveandnext.click()
}

async otherdetailsonei(){
  await this.riskrating.click();
  await this.riskratingoption.click();
  await this.saveandcontinueBTN.click();
}

async otherdetialsonetwo(){
  await expect(this.ratingdate).toBeVisible();
  await this.saveandnext.click();
}

async otherdetailstwoone(){
await this.directorcheckbox.check();
await expect(this.relateddirectorchkbox).not.toBeVisible();

//await expect(this.relateddirectorchkbox).toHaveCount(0);// checking that element is not present in the DOM

await this.saveandcontinueBTN.click();
}

async otherdetailstwotwo(){
  await this.saveandnext.click();

}

async familydetailspage(){
  await expect(this.familydetailbtn).toBeVisible();
  await this.saveandnext.click();
}

async nomineedetailspage(){

  await expect(this.page.getByRole('button', { name: 'Add Nominee Details' })).toBeVisible();
  
  await this.saveandnext.click();
}

async attestationdetailspage(){
  await expect(this.kycdeclaration).toBeVisible();
  await this.saveandnext.click();
}

async tdsinfo(){
  await this.appliedfor.click();
  await this.appliedforoption.click();
  await this.tdsreasoncode.click();
  await this.reasoncodeoption.click();
  await this.effectivedate.click();

  await expect(this.page.locator("div.react-datepicker")).toBeVisible();
  await this.page.getByText("YEAR").click();
  await this.page.locator("div.react-datepicker__year").getByText("2026").click();
  await this.page.locator("div.react-datepicker__month").getByText("Apr").click();
  await this.page.locator(`[aria-label*="April 3rd"]`).click();

  // const selecteddate=await this.page.locator("div.w-full div.text-light-textColor").inputValue();

  // await expect(selecteddate).toEqual("03-04-2026");

  await this.saveandnext.click();



}

async taxregispage(){
  await expect(this.addtaxregisbtn).toBeVisible();
  await this.saveandnext.click();

}

async facilitypage(){
  await expect(this.facilitytable).toBeVisible();
  await this.saveandnext.click();

}

async submitprocess(){
  await this.submitbtn.click();
  await expect(this.successmessage).toBeVisible();

  const message = await this.successmessage.innerText();

const match = message.match(/REF\w+/);

if (!match) {
  throw new Error("Ref ID not found in message");
}

this.refId = match[0];

console.log("Ref ID:", this.refId);

await this.yesbuttonsubmit.click();
}

async unauthorizeflow() {

  if (!this.refId) {
    throw new Error("RefID is not set!");
  }

  console.log("Using RefID:", this.refId);

  await expect(this.groupinbox).toBeVisible();

  const row = this.page.locator("tbody tr").filter({ hasText: this.refId });

  await expect(row).toBeVisible();

  // ASSIGN
  await row.getByRole('button', { name: "ASSIGN" }).click();

  await this.page.getByRole('button', { name: "Yes" }).click();

  // MY INBOX
  await expect(this.page.getByText("My Inbox")).toBeVisible();

  // AUTHORIZE
  await row.getByRole("button", { name: "AUTHORIZE" }).click();

  // HISTORY FLOW
  await this.page.locator("ul li").filter({ hasText: "HISTORY" }).click();
  await this.page.getByRole("button", { name: "NEXT" }).click();

  await expect(this.authorizebtn).toBeVisible();
  await this.authorizebtn.click();

  await this.page.getByRole("button", { name: "Yes" }).click();

  // ✅ Highlight validation
  await expect(
    this.page.getByRole("button", { name: "Authorized", exact:true })
  ).toHaveClass(/border-toggleBorderColor/);

  // ✅ Customer number extraction
  const cusnum = await row.locator("td").nth(3).textContent();

  console.log("name of the customer","Customer number:", cusnum);
}
}

export { Draft };