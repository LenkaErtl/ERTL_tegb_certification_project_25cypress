// cypress/e2e/api/login_api.cy.js

import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../support/api/user_api";

describe("User API and Register and Login", () => {
  let username;
  let password;
  let email;

  it("Register and Login via API", () => {
    username = faker.internet.username();
    password = faker.internet.password();
    email = faker.internet.email();

    cy.log("Username: " + username);
    cy.log("Password: " + password);
    cy.log("Email: " + email);

    const userApi = new UserApi();

    userApi.register(username, password, email).then((regRes) => {
      expect(regRes.status).to.eq(201);
      cy.log(" Registrace úspěšná");

      userApi.login(username, password).then((loginRes) => {
        expect(loginRes.status).to.eq(201);
        cy.log(" Přihlášení úspěšné");

        expect(loginRes.body.access_token).to.be.ok;
        cy.log(" Token byl vrácen: " + loginRes.body.access_token);
      });
    });
  });
});
