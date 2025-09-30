export class LoginPage {
  visit() {
    cy.visit(`${Cypress.env("frontendUrl")}/`);
    return this;
  }

  login({ loginname, password }) {
    cy.get("form input[type='text']").clear().type(loginname);
    cy.get("form input[type='password']").clear().type(password);
    cy.contains("Přihlásit se").click();
    return this;
  }

  verifyDashboard() {
    cy.url().should("include", "/dashboard");
    return this;
  }
}
