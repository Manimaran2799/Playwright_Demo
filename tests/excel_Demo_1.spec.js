const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');

//write Excel
async function WriteExcel(path, FilterText, ReplaceText, change) {
    
    const workBook = new ExcelJS.Workbook();
    await workBook.xlsx.readFile(path);
    const sheet = workBook.getWorksheet('Sheet1');

    const output = await ReadExcel(sheet, FilterText);

    const cell = sheet.getCell(output.row, output.column + change.column);
    cell.value = ReplaceText;

    await workBook.xlsx.writeFile(path);
}

//Read Excel
async function ReadExcel(sheet, FilterText) {
  
  let output = { row: -1, column: -1 }; 

  sheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, cellNumber) => {
      if (cell.value === FilterText) {
        output.row = rowNumber;
        output.column = cellNumber;
      }
    });
  });

  return output;
}

test("Excel test", async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/upload-download-test/");

  const DownloadPromise = page.waitForEvent('download');
  await page.locator("#downloadButton").click();
  const download = await DownloadPromise;

  const path = await download.path(); // ✅ get path

  await WriteExcel(path, "Mango", "300", { row: 0, column: 2 });

  await page.locator("#fileinput").setInputFiles(path); 


  let actualTExt = await page
    .getByRole('row')
    .filter({hasText:"Mango"})
    .locator("#cell-4-undefined")
    .textContent();

  expect(actualTExt).toBe("300");
});

//has ----> for locator hasText --->for exact text contents