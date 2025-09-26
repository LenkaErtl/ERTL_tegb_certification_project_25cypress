import { DashboardPage } from "../support/page_objects/tegb_page_objects/dashboard_page.js";

describe("TEGB – Přihlášení a přechod na dashboard", () => {
  const dashboardPage = new DashboardPage();

  const user = {
    username: Cypress.env("username"),
    email: Cypress.env("email"),
    password: Cypress.env("password"),
    firstName: Cypress.env("tegb_firstName"),
    lastName: Cypress.env("tegb_lastName"),
    phone: Cypress.env("tegb_phone"),
    age: Cypress.env("tegb_age"),
  };

  before(() => {
    // Registrace uživatele přes API
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/tegb/register`,
      body: {
        username: user.username,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        age: user.age,
      },
      failOnStatusCode: false, // když už user existuje, test nespadne
    });
  });

  it("Uživatel se úspěšně přihlásí a odhlásí", () => {
    // zachytíme login request
    cy.intercept("POST", "**/tegb/login").as("loginRequest");

    // provedeme login přes page object
    dashboardPage.login({ loginname: user.username, password: user.password });

    // počkáme na odpověď backendu a zalogujeme si ji
    cy.wait("@loginRequest").then((interception) => {
      cy.log("Login status:", interception.response?.statusCode);
      cy.log("Login body:", JSON.stringify(interception.response?.body));
    });

    // teprve pak ověřujeme dashboard a logout
    dashboardPage.shouldBeOnDashboard().logout().shouldBeLoggedOut();
  });
});
