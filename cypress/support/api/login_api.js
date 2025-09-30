export class LoginApi {
  login(username, password, failOnStatusCode = true) {
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/tegb/login`,
        body: { username, password },
        failOnStatusCode,
      })
      .as("loginUser");
  }

  loginUser(user, failOnStatusCode = true) {
    const { loginname, password } = user;
    return this.login(loginname, password, failOnStatusCode);
  }
}
