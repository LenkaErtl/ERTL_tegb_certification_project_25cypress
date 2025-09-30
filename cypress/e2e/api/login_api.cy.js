import { LoginApi } from "../../support/api/login_api";
import { AccountsApi } from "../../support/api/accounts_api";

const loginApi = new LoginApi();
const accountsApi = new AccountsApi();

describe("API Test – Přihlášení a vytvoření účtu", () => {
  const credentials = {
    username: "apitestuser",
    email: "apitestuser@example.com",
    password: "Test5577",
  };

  before(() => {
    // Registrace uživatele – pokud už existuje, nevadí
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/tegb/register`,
      body: {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      },
      failOnStatusCode: false, // když už existuje, ignorujeme chybu
    });
  });

  it("1. Přihlášení přes API – status 201 a token, vytvoření účtu", () => {
    // Login
    loginApi
      .login(credentials.username, credentials.password)
      .as("loginResponse");

    cy.get("@loginResponse").then((loginRes) => {
      expect(loginRes.status).to.eq(201);
      expect(loginRes.body)
        .to.have.property("access_token")
        .and.to.be.a("string");

      const token = loginRes.body.access_token;

      // Vytvoření účtu
      accountsApi
        .createAccount(token, { startBalance: 10000, type: "Test" })
        .as("accountResponse");
    });

    // Kontrola účtu
    cy.get("@accountResponse").then((accountRes) => {
      expect(accountRes.status).to.eq(201);
      expect(accountRes.body).to.have.property("accountNumber");
      expect(accountRes.body.balance).to.eq(10000);
      cy.log("Účet vytvořen:", accountRes.body.accountNumber);
    });
  });
});
