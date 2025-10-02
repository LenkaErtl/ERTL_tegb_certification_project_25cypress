// cypress/support/page_objects/tegb_page_objects/register_page.js

import { customElement } from "../../helpers/custom_element.js";
import { LoginPage } from "./login_page.js";

export class RegisterPage {
  constructor() {
    this.usernameInput = customElement("[data-testid='username-input']");
    this.passwordInput = customElement("[data-testid='password-input']");
    this.emailInput = customElement("[data-testid='email-input']");
    this.submitButton = customElement("[data-testid='submit-button']");
    this.successMessage = customElement("[data-testid='success-message']");
    this.loginButton = customElement("[data-testid='login-button']");
  }

  visit() {
    cy.visit("/register");
    this.usernameInput.get().should("exist");
    return this;
  }

  typeUsername(username) {
    this.usernameInput.get().should("be.enabled").clear().type(username);
    return this;
  }

  typePassword(password) {
    this.passwordInput.get().should("be.enabled").clear().type(password);
    return this;
  }

  typeEmail(email) {
    this.emailInput.get().should("be.enabled").clear().type(email);
    return this;
  }

  clickRegistr() {
    // intercept v testu, ne v PO; tady validujeme pouze UI výsledky
    this.submitButton.get().click();
    this.successMessage.get().should("be.visible");
    return this;
  }

  verifyWelcomeMessage() {
    this.successMessage.get().should("be.visible").and("contain", "Vítejte");
    return this;
  }

  clickLogin() {
    this.loginButton.get().click();
    return new LoginPage();
  }
}
