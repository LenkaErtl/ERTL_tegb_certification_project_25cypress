import { DashboardPage } from "../support/page_objects/tegb_page_objects/dashboard_page.js";

describe("TEGB – Přihlášení a přechod na dashboard", () => {
  const dashboardPage = new DashboardPage();

  const user = {
    username: Cypress.env("username"),
    password: Cypress.env("password"),
    email: Cypress.env("tegb_email"),
    firstName: Cypress.env("tegb_firstName"),
    lastName: Cypress.env("tegb_lastName"),
    phone: Cypress.env("tegb_phone"),
    age: Cypress.env("tegb_age"),
  };

  before(() => {
    // registrace uživatele – endpoint musí být /tegb/register
    cy.request({
      method: "POST",
      url: "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register",
      body: {
        username: user.username,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        age: user.age,
      },
      failOnStatusCode: false, // test nespadne, když uživatel existuje
    });
  });

  it("Uživatel se úspěšně přihlásí a odhlásí", () => {
    // zachytíme login request
    cy.intercept("POST", "**/tegb/login").as("loginRequest");

    dashboardPage.login({ loginname: user.username, password: user.password });

    // počkáme na dokončení login requestu
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 201);

    // teď ověříme dashboard
    dashboardPage.shouldBeOnDashboard().logout().shouldBeLoggedOut();
  });
});
