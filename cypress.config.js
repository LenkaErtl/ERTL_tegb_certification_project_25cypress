const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    env: {
      frontendUrl: "https://tegb-frontend-88542200c6db.herokuapp.com",
      apiUrl: "https://tegb-backend-877a0b063d29.herokuapp.com",
      tegb_login_url: "https://tegb-frontend-88542200c6db.herokuapp.com/",
      tegb_api_url: "https://tegb-backend-877a0b063d29.herokuapp.com/",
    },
    baseUrl: "https://tegb-frontend-88542200c6db.herokuapp.com/",
    watchForFileChanges: false,
    defaultCommandTimeout: 20000,
    video: false,
    chromeWebSecurity: false,
  },
});
