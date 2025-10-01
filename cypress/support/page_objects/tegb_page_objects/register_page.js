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

  fillRegistrationForm(user) {
    this.usernameInput.get().clear().type(user.username);
    this.passwordInput.get().clear().type(user.password);
    this.emailInput.get().clear().type(user.email);
    return this;
  }

  submitRegisterSuccess() {
    cy.intercept("POST", "**/register").as("register_api");
    this.submitButton.get().click();
    cy.wait("@register_api").its("response.statusCode").should("eq", 201);
    return this;
  }

  shouldSeeRegisterSuccess() {
    this.successMessage.get().should("be.visible");
    return this;
  }

  clickLogin() {
    this.loginButton.get().click();
    return new LoginPage();
  }
}
