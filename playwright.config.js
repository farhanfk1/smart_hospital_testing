const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  reporter: "html",
  use: {
    headless: false,
    slowMo: 1000,
    screenshot: "only-on-failure",
    video: "retain-on-failure-and-retries",
    trace: "on-first-retry",
  },
});
