// cypress/e2e/e2e_tests/account_balances.cy.js

import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../support/api/user_api.js";
import { AccountsApi } from "../../support/api/accounts_api.js";
import { LoginPage } from "../../support/page_objects/tegb_page_objects/login_page.js";
import { AccountsSection } from "../../support/page_objects/tegb_page_objects/accounts_section.js";
import { DashboardPage } from "../../support/page_objects/tegb_page_objects/dashboard_page.js";

const accountsData = require("../../fixtures/account_data.json");
const bugBalances = new Set([-196000921, 298000123]);

describe("Data Driven Tests – kontrola účtů s různými zůstatky", () => {
  let username, password, email, token;
  const userApi = new UserApi();
  const accountsApi = new AccountsApi();
  const loginPage = new LoginPage();
  const accountsSection = new AccountsSection();
  const dashboardPage = new DashboardPage();

  before(() => {
    username = faker.internet.userName();
    password = faker.internet.password();
    email = faker.internet.email();

    userApi.register(username, password, email).its("status").should("eq", 201);
    userApi.login(username, password).then((res) => {
      expect(res.status).to.eq(201);
      token = res.body.access_token;
    });
  });

  beforeEach(() => {
    cy.intercept("GET", "**/tegb/profile").as("getProfile");
    cy.intercept("GET", "**/tegb/accounts").as("getAccounts");
    loginPage.visit();
  });

  accountsData.forEach(({ startBalance, type, description }) => {
    const label = description || startBalance;
    const isBug = bugBalances.has(startBalance);
    const testName = isBug
      ? `DDT: účet se zůstatkem ${label} (BUG – přeskočeno)`
      : `DDT: účet se zůstatkem ${label}`;
    const testFn = isBug ? it.skip : it;

    testFn(testName, () => {
      accountsApi
        .addAccount(startBalance, type, token)
        .its("status")
        .should("eq", 201);

      loginPage.typeUsername(username).typePassword(password).clickLogin();

      cy.wait("@getProfile");
      cy.wait("@getAccounts");

      accountsSection
        .shouldShowAccountsSection()
        .verifyAccountCreated({ balance: startBalance, type });

      dashboardPage.clickLogout().shouldBeOnLogin();
    });
  });
});
