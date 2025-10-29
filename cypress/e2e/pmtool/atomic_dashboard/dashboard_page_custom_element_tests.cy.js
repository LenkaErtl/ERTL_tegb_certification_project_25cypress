// cypress/e2e/pmtool/atomic_dashboard/dashboard_page_custom_element_tests.cy.js

import { faker } from "@faker-js/faker";
import { LoginPage } from "../../../support/page_objects/tegb_page_objects/login_page.js";
import { DashboardPage } from "../../../support/page_objects/tegb_page_objects/dashboard_page.js";

describe("Dashboard – atomické testy", { testIsolation: false }, () => {
  const loginPage = new LoginPage();
  const dashboard = new DashboardPage();

  let username;
  let password;
  let email;

  before(() => {
    // vygenerujeme si unikátního uživatele
    username = faker.internet.userName();
    password = faker.internet.password();
    email = faker.internet.email();

    // vyčištění session
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    // registrace a login
    new LoginPage()
      .visit()
      .clickRegister()
      .typeUsername(username)
      .typePassword(password)
      .typeEmail(email)
      .clickRegistr()
      .verifyWelcomeMessage()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin();

    dashboard.shouldBeOnDashboard();
  });

  context("Základní prvky", () => {
    it("Titulek aplikace je viditelný a má správný text", () => {
      dashboard.appTitle.get().should("have.text", "TEG#B Dashboard");
    });

    it("Tlačítko Odhlásit je viditelné", () => {
      dashboard.logoutButton.get().should("be.visible");
    });
  });

  context("Profilová sekce", () => {
    it("Nadpis Profilu je viditelný", () => {
      dashboard.profileTitle.get().should("be.visible");
    });

    it("Label Jméno je viditelný a má správný text", () => {
      dashboard.nameLabel.get().should("have.text", "Jméno:");
    });

    it("Label Příjmení je viditelný a má správný text", () => {
      dashboard.surnameLabel.get().should("have.text", "Příjmení:");
    });

    it("Label Email je viditelný a má správný text", () => {
      dashboard.emailLabel.get().should("have.text", "Email:");
    });

    it("Label Telefon je viditelný a má správný text", () => {
      dashboard.phoneLabel.get().should("have.text", "Telefon:");
    });

    it("Label Věk je viditelný a má správný text", () => {
      dashboard.ageLabel.get().should("have.text", "Věk:");
    });

    it("Tlačítko Upravit profil je viditelné", () => {
      dashboard.editProfileButton.get().should("be.visible");
    });

    it("Kliknutí na Upravit profil zobrazí formulář", () => {
      dashboard.clickEditProfileButton();
      dashboard.profileFormIsVisible();
    });
  });

  context("Účty", () => {
    it("Nadpis sekce Účty je viditelný", () => {
      dashboard.accountsTitle.get().should("be.visible");
    });

    it("Tlačítko Přidat účet je viditelné", () => {
      dashboard.addAccountButton.get().should("be.visible");
    });
  });

  context("Odhlášení", () => {
    it("Kliknutí na Odhlásit přesměruje na login stránku", () => {
      dashboard.clickLogout();
      cy.url().should("eq", Cypress.env("frontendUrl") + "/");
      cy.get("input[name='username']").should("be.visible");
      cy.get("input[name='password']").should("be.visible");
      cy.get("button[type='submit']").should("be.visible");
    });
  });
});
