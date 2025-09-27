export class AccountsApi {
  registerUser(user) {
    const { loginname, password, email } = user;
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/tegb/register`,
        body: { username: loginname, password, email },
        failOnStatusCode: false, //  aby test nespadl, když už user existuje
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
      .then((res) => {
        //  Bonus kontrola – balance je číslo
        expect(res.body.balance).to.be.a("number");
        return res;
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
