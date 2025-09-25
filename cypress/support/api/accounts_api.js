export class AccountsApi {
  registerUser(user) {
    const { loginname, password, email } = user;
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/tegb/register`,
        body: { username: loginname, password, email },
      })
      .as("registerUser");
  }

  loginUser(user) {
    const { loginname, password } = user;
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/tegb/login`,
        body: { username: loginname, password },
      })
      .as("loginUser");
  }

  createAccount(token, { startBalance, type }) {
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/tegb/accounts/create`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: { startBalance, type },
      })
      .as("createAccount");
  }

  createAccountExpectingError(token, { startBalance, type }) {
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/tegb/accounts/create`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: { startBalance, type },
        failOnStatusCode: false,
      })
      .as("createAccountError");
  }

  getAccounts(token) {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}/tegb/accounts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .as("getAccounts");
  }
}
