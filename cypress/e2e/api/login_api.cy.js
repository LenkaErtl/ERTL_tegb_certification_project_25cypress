import { LoginApi } from "../../support/api/login_api.js";

describe("User API – Login only", () => {
  const loginApi = new LoginApi();
  const username = Cypress.env("tegb_username");
  const password = Cypress.env("tegb_password");

  it("should login existing user via API", () => {
    cy.log(`Přihlašuji uživatele: ${username}`);

    loginApi.login(username, password).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("access_token");
      expect(response.body.access_token).to.be.a("string");
    });
  });
});
