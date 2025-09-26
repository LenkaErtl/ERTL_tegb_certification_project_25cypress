export class RegisterPage {
  visit() {
    cy.visit(`${Cypress.env("frontendUrl")}/register`);
    return this;
  }

  fillForm({ loginname, email, password }) {
    cy.get('input[name="username"]').type(loginname);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    return this;
  }

  submit() {
    cy.contains("Registrovat").click();
    return this;
  }

  verifySuccess() {
    // Po registraci tě aplikace vrátí na homepage (uživatel není přihlášen)
    cy.url().should("eq", `${Cypress.env("frontendUrl")}/`);
    cy.contains("Přihlásit se").should("be.visible");
    return this;
  }
}
