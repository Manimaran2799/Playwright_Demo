export class BrowserUtils {

  static async openIncognito(browser, url) {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);

    return { page, context }; 
  }

  static async closeIncognito(context) {
    await context.close();
  }
}