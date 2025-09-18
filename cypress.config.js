const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},

    // 👇 Přidáme baseUrl
    baseUrl: "https://tegb-frontend-88542200c6db.herokuapp.com",

    env: {
      testVar: "Toto je proměnná",
      username: "vikylucie@poesd.com",
      password: "Test5577",
      tegb_url: "https://tegb-frontend-88542200c6db.herokuapp.com/",
      tegb_api_url: "https://tegb-backend-877a0b063d29.herokuapp.com/",
    },

    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    video: false,
    chromeWebSecurity: false,
  },
});
