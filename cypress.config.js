const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // zde můžeš později přidat pluginy nebo vlastní eventy
      return config;
    },

    // základní URL pro všechny cy.visit()
    baseUrl: "https://tegb-frontend-88542200c6db.herokuapp.com",

    // proměnné prostředí
    env: {
      apiUrl: "https://tegb-backend-877a0b063d29.herokuapp.com", // backend API
      frontendUrl: "https://tegb-frontend-88542200c6db.herokuapp.com", // frontend URL

      // testovací uživatel – pro API testy
      username: "vikylucie@poesd.com",
      password: "Test5577",
    },

    // nastavení běhu
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    video: false,
    chromeWebSecurity: false,
  },
});
