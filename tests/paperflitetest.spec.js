// @ts-check
import { test, expect } from '@playwright/test';

import { testData } from '../test-data/testdate-Paperflite';

import { Loginpage } from '../Pageobject-Paperflite/Loginpage';
import { Dashboard } from '../Pageobject-Paperflite/Dashboard';
import { Collectionpage } from '../Pageobject-Paperflite/Collectionpage';
import { Collectiondetailspage } from '../Pageobject-Paperflite/Collectiondetailspage';
import { Shareddetailspage } from '../Pageobject-Paperflite/Sharedetailspage';
import { Conversation } from '../Pageobject-Paperflite/Conversationpage';
import { BrowserUtils } from '../Utils-Paperflite/browserutils';

test.describe('Paperflite End-to-End Flow', () => {


  test('Full flow: login → create collection → generate link → verify',
    async ({ browser, page, context }) => {

    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Page Objects (normal)
    const login = new Loginpage(page);
    const dashboard = new Dashboard(page);
    const collection = new Collectionpage(page);
    const collectiondetails = new Collectiondetailspage(page);
    const conversation = new Conversation(page);

    // Open app
    await page.goto('https://app.paperflite.dev/public/login');

    // Login
    await login.loginprocess(testData.username, testData.password);
    await login.verifyLoginSuccess();

    // Navigate
    await dashboard.navigateToCollections();

    // Create collection
    await collection.createCollection(testData.collectionName);

    // Add assets
    await collectiondetails.addAssets(testData.files);

    // Generate link
    await collectiondetails.openGenerateLinkPopup(
      testData.password,
      testData.errormessage
    );

    // Copy link
    const link = await collectiondetails.copyGeneratedLink();
    console.log("Generated Link:", link);

    // Open Incognito
    const { page: incognitoPage, context: incognitoContext } =
      await BrowserUtils.openIncognito(browser, link);

    // Use incognito page
    const sharedPage = new Shareddetailspage(incognitoPage);

    // Login in incognito
    await sharedPage.incognitologin(
      testData.username,
      testData.password
    );

    // Validate incognito data
    const incognitoCount = await sharedPage.fetchAssetCount();
    const incognitoNames = await sharedPage.fetchAssetNames();

    console.log("Incognito Count:", incognitoCount);
    console.log("Incognito Names:", incognitoNames);

    // Close incognito
    await incognitoContext.close();

    // Back to normal page
    await page.bringToFront();

    // Conversation validations
    await conversation.searchCollection(testData.collectionName);
    const convoCount = await conversation.fetchAssetCount();
    const convoNames = await conversation.fetchAssetNames();
   
    await conversation.verifyUserEmail(testData.username);
    
    // Assertions
    expect(convoCount).toBe(incognitoCount);
    expect(convoNames).toEqual(incognitoNames);

    await conversation.deleteConversation();

    await collection.deleteCollection(testData.collectionName);
    // Logout
    await dashboard.logout();
  });
});