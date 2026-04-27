// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 40 * 1000,

  reporter: 'html',

  expect: { timeout: 15000 },
  retries :3,
  workers:3,

  // Cross Browser Config
  projects: [

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },

  ],

});