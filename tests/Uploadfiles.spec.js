
const {test,expect}=require('@playwright/test');

test("Single File upload", async({page})=>{

    await page.goto("https://practice.expandtesting.com/upload");
    await page.waitForSelector("#fileInput");
    await page.locator("#fileInput").setInputFiles("Uploadfiles/Sample_A.jpg");
    await page.waitForTimeout(5000);

    

})

test("Multiple File upload", async({page})=>{

    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.waitForSelector("#filesToUpload");
    await page.locator("#filesToUpload").setInputFiles(["Uploadfiles/Sample_A.jpg","Uploadfiles/Sample_B.jpg"]);
    await page.waitForTimeout(3000);
    //assert
    await expect(page.locator("#fileLst li:nth-child(1)")).toHaveText("Sample_A.jpg");

    await page.waitForTimeout(3000);
    //removing
    await page.locator("#filesToUpload").setInputFiles([]);
    await page.waitForTimeout(3000);

})