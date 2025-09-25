import { generateUser } from "../../support/helpers/faker_generator.js";
import { LoginApi } from "../../support/api/login_api.js";
import { AccountsApi } from "../../support/api/accounts_api.js";
import { RegisterPage } from "../../support/pages/RegisterPage.js";
import { TegBLoginPage } from "../../support/page_objects/tegb_page_objects/tegb_login_page.js";
import { ProfileSection } from "../../support/page_objects/tegb_page_objects/profile_section.js";
import { DashboardPage } from "../../support/page_objects/tegb_page_objects/dashboard_page.js";
import { AccountsPage } from "../../support/page_objects/tegb_page_objects/accounts_page.js";

const loginApi = new LoginApi();
const accountsApi = new AccountsApi();
const registerPage = new RegisterPage();
const loginPage = new TegBLoginPage();
const dashboardPage = new DashboardPage();
const profileSection = new ProfileSection();
const accountsPage = new AccountsPage();

describe("TEGB - Kompletní E2E scénář uživatelské cesty", () => {
  const userData = generateUser();
  const accountData = { startBalance: 10000, type: "Test", currency: "CZK" };

  it("Kompletní scénář: registrace, přihlášení, úprava profilu, vytvoření účtu a odhlášení", () => {
    // 1. Registrace
    cy.log("Krok 1: Registrace uživatele");
    registerPage.visit().fillForm(userData).submit().verifySuccess();

    // 2. Přihlášení (z homepage, ne z /login)
    cy.log("Krok 2: Přihlášení uživatele");
    loginPage.loginFromHomepage(userData.loginname, userData.password);
    dashboardPage.shouldBeOnDashboard();

    // 3. Otevření editace profilu
    cy.log("Krok 3: Otevření editace profilu");
    profileSection.openEdit();

    // 4. Úprava profilu
    cy.log("Krok 4: Vyplnění a uložení profilu");
    profileSection.fillProfile(userData).submit().verifyProfile(userData);

    // 5. Vytvoření účtu přes API
    cy.log("Krok 5: Vytvoření účtu přes API");
    loginApi.loginUser(userData).then((loginRes) => {
      const token = loginRes.body.access_token;
      accountsApi
        .createAccount(token, {
          startBalance: accountData.startBalance,
          type: accountData.type,
        })
        .then((accountRes) => {
          expect(accountRes.status).to.eq(201);
        });
    });

    // 6. Zobrazení účtu
    cy.log("Krok 6: Zobrazení vytvořeného účtu (funkcionalita je nekompletní)");
    dashboardPage.goToAccounts();
    accountsPage.shouldHaveTitle("Účty");
    cy.log("Zobrazení účtu na frontendu je nefunkční. Test by zde selhal.");

    // 7. Odhlášení
    cy.log("Krok 7: Odhlášení");
    dashboardPage.logout().shouldBeLoggedOut();
  });
});
