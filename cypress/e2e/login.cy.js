import { DashboardPage } from "../support/page_objects/tegb_page_objects/dashboard_page";

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
    // registrace uživatele přes API (pokud už existuje, failOnStatusCode: false to ignoruje)
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
      failOnStatusCode: false,
    });
  });

  it("Uživatel se úspěšně přihlásí a odhlásí", () => {
    // zachytíme login request
    cy.intercept("POST", "**/tegb/login").as("loginRequest");

    // použijeme page object, který už řeší obě varianty login formuláře
    dashboardPage.login({ loginname: user.username, password: user.password });

    // počkáme na odpověď backendu a zalogujeme si ji
    cy.wait("@loginRequest").then((interception) => {
      cy.log("Login status:", interception.response?.statusCode);
      cy.log("Login body:", JSON.stringify(interception.response?.body));
    });

    // ověření dashboardu
    dashboardPage.shouldBeOnDashboard();

    // odhlášení
    dashboardPage.logout().shouldBeLoggedOut();
  });
});
