// cypress/support/page_objects/tegb_page_objects/login_page.js

import { customElement } from "../../helpers/custom_element.js";
import { DashboardPage } from "./dashboard_page.js";
import { RegisterPage } from "./register_page.js";

export class LoginPage {
  constructor() {
    this.usernameInput = customElement("[data-testid='username-input']");
    this.passwordInput = customElement("[data-testid='password-input']");
    this.loginButton = customElement("[data-testid='submit-button']");
    this.registerAnchor = customElement("[data-testid='register-button']");
    this.errorMessage = customElement(".error-message");
    this.forgotPasswordButton = customElement(
      "button[data-testid='forgot-password']"
    );
    this.logoutButton = customElement(".logout-link");

    // Registrace
    this.emailInput = customElement("[data-testid='email-input']");
    this.submitRegisterButton = customElement(
      "[data-testid='submit-register']"
    );
    this.welcomeMessage = customElement("[data-testid='welcome-message']");
  }

  visit() {
    const baseUrl =
      Cypress.env("frontendUrl") ||
      "https://tegb-frontend-88542200c6db.herokuapp.com";
    cy.visit(`${baseUrl}/`);
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

  clickLogin() {
    this.loginButton.get().click();
    cy.location("pathname").should("include", "/dashboard");
    return new DashboardPage();
  }

  clickRegister() {
    this.registerAnchor.get().click();
    return new RegisterPage();
  }

  clickSubmitRegister() {
    this.submitRegisterButton.get().click();
    return this;
  }

  welcomeMessageIsVisible() {
    this.welcomeMessage.get().should("be.visible").and("have.text", "Vítejte!");
    return this;
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    return this.clickLogin();
  }

  clickLogout() {
    this.logoutButton.get().click();
    return this;
  }

  verifyErrorMessage(expectedText) {
    this.errorMessage.get().should("be.visible").and("have.text", expectedText);
    return this;
  }

  clickForgotPassword() {
    this.forgotPasswordButton.get().click();
    return this;
  }
  shouldBeOnLogin() {
    this.usernameInput.get().should("be.visible");
    return this;
  }
}
