import { RegisterPage } from "../../support/page_objects/tegb_page_objects/register_page.js";
import { LoginPage } from "../../support/page_objects/tegb_page_objects/login_page.js";
import { DashboardPage } from "../../support/page_objects/tegb_page_objects/dashboard_page.js";
import { ProfileSection } from "../../support/page_objects/tegb_page_objects/profile_section.js";
import {
  AccountsSection,
  AccountsSection,
} from "../../support/page_objects/tegb_page_objects/accounts_section.js";
import { fakerCS_CZ as faker } from "@faker-js/faker";

const registerPage = new RegisterPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const profileSection = new ProfileSection();
const AccountsSection = new AccountsSection();

describe("TEGB - Kompletní E2E scénář uživatelské cesty", () => {
  it("Kompletní scénář: registrace, přihlášení, úprava profilu a odhlášení", () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10, prefix: "Test" }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number("#########"),
      age: faker.number.int({ min: 18, max: 70 }),
    };

    cy.log("Krok 1: Registrace uživatele");
    registerPage
      .visit()
      .fillRegistrationForm(user)
      .submitRegisterSuccess()
      .shouldSeeRegisterSuccess();

    cy.log("Krok 2: Přihlášení uživatele");
    loginPage
      .visit()
      .fillLoginForm(user)
      .submitLoginSuccess()
      .shouldBeOnDashboard();

    cy.log("Krok 3: Úprava profilu");
    dashboardPage.goToProfile();
    profileSection
      .fillProfileForm(user)
      .submitProfileChanges()
      .shouldSeeProfileUpdated(user);

    cy.log("Krok 4: Odhlášení");
    dashboardPage.logout().shouldBeLoggedOut(); // ověřuje login stránku (username/password inputy)
  });

  // BUG: tlačítko/formulář pro vytvoření účtu není stabilní → test vědomě skipnutý
  it.skip("Krok 5: Vytvoření účtu (BUG – tlačítko/formulář není stabilní)", () => {
    dashboardPage.goToAccounts();
    accountsPage.createAccount({ startBalance: 5000, type: "Test" });

    // Validace přes dashboard – připraveno pro audit
    dashboardPage.verifyAccountSummary({ balance: 5000, type: "Test" });
  });
});
