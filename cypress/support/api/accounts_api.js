// AccountsApi – používá se v DDT a E2E scénářích, zahrnuje registraci a práci s účty

export class AccountsApi {
  registerUser(user) {
    const { username, password, email } = user;
    return cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/tegb/register`,
      body: { username, password, email },
      failOnStatusCode: false,
    });
  }

  loginUser(user, failOnStatusCode = true) {
    const { username, password } = user;
    return cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/tegb/login`,
      body: { username, password },
      failOnStatusCode,
    });
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
        expect(res.body.balance).to.be.a("number");
        return res;
      });
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

      .then((res) => {
        expect(res.status).to.eq(400); // nebo jiný očekávaný error kód
        expect(res.body).to.have.property("error"); // volitelně: validace obsahu chyby
        return res;
      });
  }

  getAccounts(token) {
    return cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/tegb/accounts`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
