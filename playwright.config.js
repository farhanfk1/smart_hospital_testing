const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60000,

  expect: {
    timeout: 10000,
  },
  reporter: "html",
  use: {
    headless: true,
    slowMo: 1000,
    screenshot: "only-on-failure",
    video: "retain-on-failure-and-retries",
    trace: "on-first-retry",
  },
});
