import { customElement } from "../../helpers/custom_element.js";
import { DashboardPage } from "./dashboard_page.js";

export class TegbLoginPage {
  // sjednoceno malé b
  constructor() {
    this.usernameInput = customElement('input[name="username"]');
    this.passwordInput = customElement('input[name="password"]');
    this.loginButton = customElement('[data-testid="submit-button"]');
  }

  typeUsername(username) {
    this.usernameInput.clear().type(username);
    return this;
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  clickLogin() {
    cy.intercept("POST", "**/login").as("login_api");
    this.loginButton.click();
    cy.wait("@login_api");
    cy.location("pathname").should("include", "/dashboard");
    return new DashboardPage();
  }

  loginFromHomepage(username, password) {
    cy.intercept("POST", "**/login").as("login_api");
    cy.get('input[name="username"]')
      .should("be.visible")
      .clear()
      .type(username);
    cy.get('input[name="password"]')
      .should("be.visible")
      .clear()
      .type(password);
    cy.get('[data-testid="submit-button"]').should("be.visible").click();
    cy.wait("@login_api");
    cy.location("pathname").should("include", "/dashboard");
    return new DashboardPage();
  }
}
