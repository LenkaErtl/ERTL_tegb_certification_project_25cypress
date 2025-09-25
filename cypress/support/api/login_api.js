export class LoginApi {
  login(username, password) {
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/tegb/login`,
        body: { username, password },
      })
      .as("loginUser");
  }

  loginUser(user) {
    const { loginname, password } = user;
    return this.login(loginname, password);
  }
}
