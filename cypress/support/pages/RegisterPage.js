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
    cy.contains("Registrace úspěšná! Vítejte v TEG#B!").should("be.visible");
    return this;
  }
}
