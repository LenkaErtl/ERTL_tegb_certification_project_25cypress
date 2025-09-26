import { RegisterPage } from "../../support/pages/RegisterPage";
import { DashboardPage } from "../../support/pages/DashboardPage";
import { AccountsPage } from "../../support/pages/accounts_page";
import { ProfilePage } from "../../support/pages/profile_page";

const registerPage = new RegisterPage();
const dashboardPage = new DashboardPage();
const accountsPage = new AccountsPage();
const profilePage = new ProfilePage();

describe("TEGB - Kompletní E2E scénář uživatelské cesty", () => {
  it("Kompletní scénář: registrace, přihlášení, úprava profilu, vytvoření účtu a odhlášení", () => {
    const user = {
      loginname: `user_${Date.now()}`,
      email: `user_${Date.now()}@example.com`,
      password: "Test1234!",
    };

    // Krok 1: Registrace
    cy.log("Krok 1: Registrace uživatele");
    registerPage.visit().fillForm(user).submit().verifySuccess();

    // Krok 2: Přihlášení
    cy.log("Krok 2: Přihlášení uživatele");
    dashboardPage.login(user).shouldBeOnDashboard();

    // Krok 3: Úprava profilu
    cy.log("Krok 3: Úprava profilu");
    dashboardPage.goToProfile();
    profilePage.updateProfile({ firstName: "Lenka", lastName: "Tester" });
    profilePage.verifyProfileUpdated();

    // Krok 4: Vytvoření účtu
    cy.log("Krok 4: Vytvoření účtu");
    dashboardPage.goToAccounts();
    accountsPage.createAccount({ startBalance: 5000, type: "Test" });
    accountsPage.verifyAccountCreated(5000);

    // Krok 5: Odhlášení
    cy.log("Krok 5: Odhlášení");
    dashboardPage.logout().shouldBeLoggedOut();
  });
});
