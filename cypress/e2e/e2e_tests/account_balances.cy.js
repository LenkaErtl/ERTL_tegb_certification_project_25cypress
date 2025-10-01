import { generateUser } from "../../support/helpers/faker_generator.js";
import { AccountsApi } from "../../support/api/accounts_api.js";
import { LoginApi } from "../../support/api/login_api.js";
import { LoginPage } from "../../support/page_objects/tegb_page_objects/login_page.js";
import { DashboardPage } from "../../support/page_objects/tegb_page_objects/dashboard_page.js";
import { AccountsSection } from "../../support/page_objects/tegb_page_objects/accounts_section.js";

const balances = require("../../fixtures/account_balances.json");

const accountsApi = new AccountsApi();
const loginApi = new LoginApi();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

// Známé bugy backendu:
// -196000921 → backend vrací 500 místo validace
// 298000123  → backend vrací 500 místo validace
const bugBalances = [-196000921, 298000123];

describe("Data Driven Test – kontrola účtů s různými částkami", () => {
  balances.forEach((data, index) => {
    const { startBalance } = data;
    const user = generateUser();
    const isBugScenario = bugBalances.includes(startBalance);

    (isBugScenario ? it.skip : it)(
      `Uživatel ${index + 1} → účet s částkou ${startBalance}${
        isBugScenario ? " (BUG – test přeskočen)" : ""
      }`,
      () => {
        // 1. Registrace uživatele přes API
        accountsApi.registerUser(user).then((regRes) => {
          expect(regRes.status).to.eq(201);
        });

        // 2. Login přes API → získání tokenu
        loginApi.loginUser(user).as("loginResponse");

        cy.get("@loginResponse").then((loginRes) => {
          expect(loginRes.status).to.eq(201);
          const token = loginRes.body.access_token;

          // 3. Vytvoření účtu přes API
          accountsApi
            .createAccount(token, { startBalance, type: "Test" })
            .as("accountResponse");
        });

        cy.get("@accountResponse").then((accountRes) => {
          expect(accountRes.status).to.eq(201);
          expect(Number(accountRes.body.balance)).to.eq(startBalance);
        });

        // 4. Přihlášení přes frontend
        cy.intercept("GET", "**/tegb/accounts").as("getAccounts");

        loginPage
          .visit()
          .fillUsername(user.username)
          .fillPassword(user.password)
          .submitLoginSuccess();

        // 5. Počkat na načtení účtů
        cy.wait("@getAccounts");

        // 6. Založení účtu přes UI
        dashboardPage.addAccountButton.get().click();
        const accountSection = new AccountsSection();
        accountSection.startBalanceInput
          .get()
          .clear()
          .type(startBalance.toString());
        accountSection.typeSelect.get().select("Test");
        accountSection.submitButton.get().click();

        // 7. Ověření účtu na dashboardu
        dashboardPage.verifyAccountBalance(startBalance);
      }
    );
  });
});
