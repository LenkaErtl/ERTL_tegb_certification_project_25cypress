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
  }

  visit() {
    const baseUrl =
      Cypress.env("frontendUrl") ||
      "https://tegb-frontend-88542200c6db.herokuapp.com";

    cy.visit(`${baseUrl}/`);
    this.usernameInput.get().should("exist");
    return this;
  }

  fillUsername(username = Cypress.env("tegb_username")) {
    this.usernameInput.get().should("be.enabled").clear().type(username);
    return this;
  }

  fillPassword(password = Cypress.env("tegb_password")) {
    this.passwordInput.get().should("be.enabled").clear().type(password);
    return this;
  }

  // sjednocená metoda pro E2E scénář
  fillLoginForm(user) {
    this.fillUsername(user.username);
    this.fillPassword(user.password);
    return this;
  }

  submitLoginSuccess() {
    cy.intercept("POST", "**/login").as("login_api");
    cy.intercept("GET", "**/profile").as("profile_api");

    this.loginButton.get().click();

    cy.wait("@login_api");
    cy.wait("@profile_api");
    cy.location("pathname").should("include", "/dashboard");
    return new DashboardPage();
  }

  submitLoginFail() {
    cy.intercept("POST", "**/login").as("login_api");
    this.loginButton.get().click();
    cy.wait("@login_api");
    this.errorMessage.get().should("be.visible");
    return this;
  }

  login() {
    this.fillUsername();
    this.fillPassword();
    return this.submitLoginSuccess();
  }

  goToRegister() {
    this.registerAnchor.get().click();
    return new RegisterPage();
  }

  verifyErrorMessage(expectedText) {
    this.errorMessage
      .get()
      .should("be.visible")
      .and("contain.text", expectedText);
    return this;
  }

  clickForgotPassword() {
    this.forgotPasswordButton.get().click();
    return this;
  }
}
