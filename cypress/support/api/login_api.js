// LoginApi – slouží výhradně pro API-only testy přihlášení

export class LoginApi {
  login(username, password, failOnStatusCode = true) {
    return cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/tegb/login`,
      body: { username, password },
      failOnStatusCode,
    });
  }

  loginUser(user, failOnStatusCode = true) {
    const { username, password } = user;
    return this.login(username, password, failOnStatusCode);
  }
}
