// /support/api/user_api.js

export class UserApi {
  constructor() {
    this.apiUrl = Cypress.env("apiUrl");
  }

  login({ username, password }, failOnStatusCode = true) {
    return cy.request({
      method: "POST",
      url: `${this.apiUrl}/tegb/login`,
      headers: { "Content-Type": "application/json" },
      body: { username, password },
      failOnStatusCode,
    });
  }

  register({ username, password, email }, failOnStatusCode = true) {
    return cy.request({
      method: "POST",
      url: `${this.apiUrl}/tegb/register`,
      headers: { "Content-Type": "application/json" },
      body: { username, password, email },
      failOnStatusCode,
    });
  }

  createAccount({ startBalance, type, token }) {
    return cy.request({
      method: "POST",
      url: `${this.apiUrl}/tegb/accounts/create`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: { startBalance, type },
    });
  }
}
