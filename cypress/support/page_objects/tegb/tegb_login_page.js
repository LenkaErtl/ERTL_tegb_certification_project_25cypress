import { customElement } from "../../helpers/custom_element.js";

import { DashboardPage } from "./dashboard_page.js";

export class TegBLoginPage {
  constructor() {
    // URL míří přímo na login stránku nasazené aplikace
    this.url = "https://tegb-frontend-88542200c6db.herokuapp.com/login";

    // Selektory definované přes helper
    this.usernameInput = customElement('[data-testid="username"]');
    this.passwordInput = customElement('[data-testid="password"]');
    this.loginButton = customElement('[data-testid="log_in"]');
  }

  openTegb() {
    cy.visit(this.url);
    return this;
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
    cy.intercept("POST", "/auth/login").as("login_api");
    this.loginButton.click();
    cy.wait("@login_api");
    return new DashboardPage();
  }

  login(username, password) {
    return this.openTegb()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin();
  }
}
