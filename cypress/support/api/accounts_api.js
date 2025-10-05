// cypress/support/api/accounts_api.js

export class AccountsApi {
  constructor() {
    this.apiUrl = Cypress.env("apiUrl");
  }

  addAccount(startBalance, type, token) {
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
