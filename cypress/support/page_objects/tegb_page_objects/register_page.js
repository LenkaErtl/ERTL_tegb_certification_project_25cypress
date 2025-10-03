import { customElement } from "../../helpers/custom_element.js";
import { DashboardPage } from "./dashboard_page.js";

export class RegisterPage {
  constructor() {
    this.usernameInput = customElement("[data-testid='username-input']");
    this.passwordInput = customElement("[data-testid='password-input']");
    this.emailInput = customElement("[data-testid='email-input']");
    this.submitButton = customElement("[data-testid='submit-button']");
    this.successMessage = customElement("[data-testid='success-message']");
    this.loginButton = customElement("[data-testid='submit-button']");
  }

  visit() {
    cy.visit("/register");
    cy.url().should("include", "/register");
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
    this.submitButton.get().click();
    return this;
  }

  verifyWelcomeMessage() {
    this.successMessage.get().should("be.visible").and("contain", "Vítejte");
    return this;
  }

  clickLogin() {
    this.loginButton.get().click();
    return new DashboardPage();
  }
}
