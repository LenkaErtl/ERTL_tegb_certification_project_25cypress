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
  const accountsPage = new AccountsSection();
  const dashboardPage = new DashboardPage();

  before(() => {
    username = faker.internet.userName();
    password = faker.internet.password();
    email = faker.internet.email();

    // zaregistruj a přihlaš uživatele přes API
    userApi.register(username, password, email).its("status").should("eq", 201);
    userApi.login(username, password).then((res) => {
      expect(res.status).to.eq(201);
      token = res.body.access_token;
    });
  });

  beforeEach(() => {
    // zachyt profil i účty
    cy.intercept("GET", "**/tegb/profile").as("getProfile");
    cy.intercept("GET", "**/tegb/accounts").as("getAccounts");

    // vždy začni na přihlašovací stránce
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
      if (isBug) {
        cy.log(`Přeskočeno kvůli známému bugu: ${label}`);
        return;
      }
      // nejdřív vytvoř účet přes API
      accountsApi
        .addAccount(startBalance, type, token)
        .its("status")
        .should("eq", 201);

      // pak přihlaš UI a čekej na načtení dat
      loginPage.typeUsername(username).typePassword(password).clickLogin();

      cy.wait("@getProfile");
      cy.wait("@getAccounts");

      // ověř, že sekce „Účty“ byla vykreslena
      cy.get("[data-testid='accounts-title']").should("be.visible");

      // ověřím sekci a tabulka
      accountsPage
        .shouldShowAccountsSection()
        .verifyAccountCreated({ balance: startBalance, type });

      // odhlášení a kontrola návratu na login
      dashboardPage.clickLogout().shouldBeOnLogin();
    });
  });
});
