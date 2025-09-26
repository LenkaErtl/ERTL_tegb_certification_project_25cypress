export class RegisterPage {
  visit() {
    cy.visit(`${Cypress.env("frontendUrl")}/register`);
    return this;
  }

  fillForm({ loginname, email, password }) {
    cy.get('[data-testid="username-input"]').clear().type(loginname);
    cy.get('[data-testid="email-input"]').clear().type(email);
    cy.get('[data-testid="password-input"]').clear().type(password);
    return this;
  }

  submit() {
    cy.contains('button[data-testid="submit-button"]', "Registrovat").click();
    return this;
  }

  verifySuccess() {
    cy.url().should("match", new RegExp(`${Cypress.env("frontendUrl")}/?$`));
    cy.contains("Přihlásit se").should("be.visible");
    // volitelně: cy.contains("Registrace proběhla úspěšně").should("be.visible");
    return this;
  }
}
