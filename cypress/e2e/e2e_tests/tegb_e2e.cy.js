// cypress/e2e/e2e_tests/tegb_e2e.cy.js

import { RegisterPage } from "../../support/page_objects/tegb_page_objects/register_page.js";
import { LoginPage } from "../../support/page_objects/tegb_page_objects/login_page.js";
import { DashboardPage } from "../../support/page_objects/tegb_page_objects/dashboard_page.js";
import { ProfileSection } from "../../support/page_objects/tegb_page_objects/profile_section.js";
import { AccountsSection } from "../../support/page_objects/tegb_page_objects/accounts_section.js";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../support/api/user_api.js";
import { AccountsApi } from "../../support/api/accounts_api.js";

describe("E2E Test", () => {
  const username = faker.internet.username();
  const password = faker.internet.password();
  const email = faker.internet.email();
  const startBalance = 10000;
  const type = "Test";
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phone = faker.phone.number({ style: "international" });
  const age = faker.number.int({ min: 18, max: 80 });

  it("Registration to teg#b", () => {
    // 1) Registrace přes UI (fluent LoginPage / Register flow)
    new LoginPage()
      .visit()
      .clickRegister()
      .typeUsername(username)
      .typePassword(password)
      .typeEmail(email)
      .clickRegistr()
      .welcomeMessageIsVisible()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin();

    const userApi = new UserApi();
    const accountsApi = new AccountsApi();

    // 2) Přihlášení přes API -> vytvoření účtu přes API -> nastavení cookie a čekání na FE request
    // Vracíme Cypress chain, žádný mix cy příkazů v čistých Promise callbackech
    return userApi.login(username, password).then((loginRes) => {
      expect(loginRes.status).to.eq(201);
      const token = loginRes.body.access_token;
      expect(token).to.be.a("string");

      // vytvoření účtu přes API
      return accountsApi
        .addAccount(startBalance, type, token)
        .then((accRes) => {
          expect(accRes.status).to.eq(201);
          expect(Number(accRes.body.balance)).to.eq(Number(startBalance));

          // musíme navštívit doménu před nastavením cookie, aby cookie měla správnou doménu
          cy.visit(Cypress.env("frontendUrl") || "/");

          // nastavíme cookie s platným tokenem
          cy.setCookie("access_token", token);

          // připravíme intercept před tím, než FE znovu načte účty
          cy.intercept("GET", "**/tegb/accounts").as("accounts_api");

          // znovu navštívíme dashboard/loginPage, aby FE načetlo účty s tokenem
          new LoginPage()
            .visit()
            .typeUsername(username)
            .typePassword(password)
            .clickLogin();

          // počkáme na načtení účtů ze serveru
          cy.wait("@accounts_api");

          // 3) Edit profilu přes UI
          new ProfileDetailsPage()
            .clickEditProfile()
            .typeFirstName(firstName)
            .typeLastName(lastName)
            .typeEmail(email)
            .typePhone(phone)
            .typeAge(age)
            .clickSave()
            .logoIsVisible();

          // 4) Validace dat na dashboardu
          new CheckDataPage()
            .nameContainsText(firstName)
            .surnameContainsText(lastName)
            .emailContainsText(email)
            .phoneContainsText(phone)
            .ageContainText(age)
            .accountNumberIsVisible()
            .accountBalanceContainsText(String(startBalance))
            .accountTypeContainsText(type);

          // 5) Odhlášení
          new LoginPage().clicklogout();
        });
    });
  });
});
