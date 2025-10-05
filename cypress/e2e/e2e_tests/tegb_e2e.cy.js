// cypress/e2e/e2e_tests/tegb_e2e.cy.js

import { LoginPage } from "../../support/page_objects/tegb_page_objects/login_page.js";
import { fakerCS_CZ as faker } from "@faker-js/faker";

describe("TEGB – Kompletní E2E scénář uživatelské cesty", () => {
  const username = faker.internet.username();
  const password = faker.internet.password();
  const email = faker.internet.email();
  const firstName = "Lenka";
  const lastName = "Tester";
  const phone = "123456789";
  const age = 30;

  it("Registrace, přihlášení, kontrola dashboardu, úprava profilu, odhlášení", () => {
    cy.intercept("GET", "**/tegb/profile").as("getProfile");
    cy.intercept("GET", "**/tegb/accounts").as("getAccounts");

    // Registrace a přihlášení
    const dashboardPage = new LoginPage()
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

    cy.wait("@getProfile");
    cy.wait("@getAccounts");

    // Kontrola dashboardu (viditelné prvky)
    dashboardPage.shouldBeOnDashboard().accountsSectionIsVisible();

    // Úprava profilu
    dashboardPage
      .goToProfile()
      .clickEditProfile()
      .typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typeAge(age)
      .clickSave()
      .shouldSeeProfileUpdated({ firstName, lastName, email, phone, age });

    // Odhlášení
    dashboardPage.clickLogout().shouldBeOnLogin();
  });
});
