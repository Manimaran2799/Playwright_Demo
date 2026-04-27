export class Actions {

  static async click(locator) {
      await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  static async fill(locator, value) {
    
    await locator.fill(value);
  }

  static async clearAndFill(locator, value) {
  
    await locator.fill('');
    await locator.fill(value);
  }

  static async hover(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
  }

  static async getText(locator) {
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent();
  }

  static async enableToggle(toggleLocator) {
  
await toggleLocator.click();
  

}

static async getCopiedText(page) {
    const text = await page.evaluate(() => navigator.clipboard.readText());
    return text;
  }


  static async getCount(locator) {
    await locator.first().waitFor({ state: 'visible' }); 
    return await locator.count();
  }
 static async getAllTexts(locator) {
  const texts = await locator.allTextContents();
  return texts.map(text => text.trim());
}

}