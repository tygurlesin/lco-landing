// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: 'quiz.spec.js',
  reporter: 'list',
  use: {
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // Pixel 5 is a Chromium device, so it verifies the mobile-responsive layout
    // without needing any extra browser engines installed.
    { name: 'mobile',  use: { ...devices['Pixel 5'] } },
  ],
});
