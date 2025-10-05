// cypress/e2e/api/login_api.cy.js

import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../support/api/user_api";

describe("User API – registrace a přihlášení", () => {
  let username;
  let password;
  let email;

  it("zaregistruje a přihlásí uživatele přes API", () => {
    username = faker.internet.username();
    password = faker.internet.password();
    email = faker.internet.email();

    const userApi = new UserApi();

    // registrace
    userApi.register(username, password, email).then((regRes) => {
      expect(regRes.status).to.eq(201);

      // login
      userApi.login(username, password).then((loginRes) => {
        expect(loginRes.status).to.eq(201);
        expect(loginRes.body.access_token).to.exist;
      });
    });
  });
});
