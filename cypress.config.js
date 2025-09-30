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
      apiUrl: "https://tegb-backend-877a0b063d29.herokuapp.com",
      frontendUrl: "https://tegb-frontend-88542200c6db.herokuapp.com",

      // testovací uživatel
      username: "vikylucie", // login jméno (pro přihlášení)
      email: "vikylucie@poesd.com", // email (pro registraci)
      password: "Test5577",

      tegb_firstName: "Viky",
      tegb_lastName: "Lucie",
      tegb_phone: "123456789",
      tegb_age: 25,
    },

    // nastavení běhu
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    video: false,
    chromeWebSecurity: false,
  },
});
