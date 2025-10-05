// cypress/support/api/user_api.js

export class UserApi {
  constructor() {
    this.apiUrl = Cypress.env("apiUrl");
  }

  register(username, password, email) {
    return cy.request({
      method: "POST",
      url: `${this.apiUrl}/tegb/register`,
      headers: { "Content-Type": "application/json" },
      body: { username, password, email },
    });
  }

  login(username, password) {
    return cy.request({
      method: "POST",
      url: `${this.apiUrl}/tegb/login`,
      headers: { "Content-Type": "application/json" },
      body: { username, password },
    });
  }
}
