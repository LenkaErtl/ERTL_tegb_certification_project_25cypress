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
    dashboardPage
      .login({ loginname: user.username, password: user.password })
      .shouldBeOnDashboard()
      .logout()
      .shouldBeLoggedOut();
  });
});
