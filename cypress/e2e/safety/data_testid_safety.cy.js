// cypress/e2e/safety/data_testid_safety.cy.js

import { LoginPage } from "../../support/page_objects/tegb_page_objects/login_page";
import { fakerCS_CZ as faker } from "@faker-js/faker";

describe(
  "Safety check – data-testid existují",
  { testIsolation: false },
  () => {
    const loginPage = new LoginPage();

    let username;
    let password;
    let email;

    before(() => {
      username = faker.internet.userName();
      password = faker.internet.password();
      email = faker.internet.email();

      // vyčištění session
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
      cy.clearAllSessionStorage();

      // registrace a login
      loginPage
        .visit()
        .clickRegister()
        .typeUsername(username)
        .typePassword(password)
        .typeEmail(email)
        .clickRegistr()
        .verifyWelcomeMessage()
        .typeUsername(username)
        .typePassword(password)
        .clickLogin()
        .goToProfile()
        .clickEditProfile();
    });

    it("Profile inputs mají očekávané data-testid", () => {
      cy.get("input[data-testid='chage-name-input']").should("exist");
      cy.get("input[data-testid='chage-surname-input']").should("exist");
      cy.get("input[data-testid='chage-email-input']").should("exist");
      cy.get("input[data-testid='chage-phone-input']").should("exist");
      cy.get("input[data-testid='chage-age-input']").should("exist");
    });

    it("Save button má očekávané data-testid", () => {
      cy.get("button[data-testid='save-changes-button']").should("exist");
    });
  }
);
