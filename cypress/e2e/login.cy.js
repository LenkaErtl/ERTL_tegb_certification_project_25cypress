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
    cy.intercept("POST", "**/tegb/login").as("loginRequest");

    cy.visit(Cypress.config("baseUrl"));
    cy.get("form", { timeout: 15000 }).should("be.visible");

    // Opravené selektory podle reálného DOMu
    cy.get('input[name="username"]').clear().type(user.username);
    cy.get('input[name="password"]').clear().type(user.password);
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest").then((interception) => {
      cy.log("Login status:", interception.response?.statusCode);
      cy.log("Login body:", JSON.stringify(interception.response?.body));
    });

    cy.contains("Odhlásit se", { timeout: 20000 }).should("be.visible");
    cy.get(".logout-link").click();
    cy.contains("Přihlásit se", { timeout: 10000 }).should("be.visible");
  });
});
