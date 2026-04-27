// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  timeout: 60000,

  expect: {
    timeout: 10000
  },

  retries: 1,

  workers: 1,

  reporter: [
    ['list'],
    ['html'],
    ['junit', { outputFile: 'results.xml' }],
    ['allure-playwright']
  ],

  use: {
    browserName: 'chromium',
    headless: false,

    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',

    launchOptions: {
      slowMo: process.env.SLOWMO ? 500 : 0
    }
  }

});