// cypress/support/page_objects/tegb_page_objects/dashboard_page.js

import { customElement } from "../../helpers/custom_element.js";
import { AccountsSection } from "./accounts_section.js";
import { ProfileSection } from "./profile_section.js";

export class DashboardPage {
  constructor() {
    // hlavní obsah
    this.dashboardContent = customElement("[data-testid='dashboard-content']");

    // navigační položky
    this.navUcty = customElement("[data-testid='nav-ucty']");
    this.domuAnchor = customElement("[data-testid='nav-domu']");
    this.transakceAnchor = customElement("[data-testid='nav-transakce']");
    this.podporaAnchor = customElement("[data-testid='nav-podpora']");

    // odhlášení
    this.logoutButton = customElement("[data-testid='logout-button']");

    // pro ověření návratu na login
    this.loginMarker = customElement("[data-testid='username-input']");

    // (volitelné) prvky sekce účtů – použijete v metodách createAccount / validateAccount
    this.addAccountButton = customElement("[data-testid='add-account-button']");
    this.accountBalanceInput = customElement(
      "[data-testid='start-balance-input']"
    );
    this.accountTypeSelect = customElement(
      "[data-testid='account-type-select']"
    );
    this.submitAccountButton = customElement(
      "[data-testid='submit-account-button']"
    );
    this.accountRow = customElement("[data-testid='account-row']");
    this.accountNumberValue = customElement("[data-testid='account-number']");
    this.accountBalanceValue = customElement("[data-testid='account-balance']");
    this.accountTypeValue = customElement("[data-testid='account-type']");
  }

  // ověříme, že jsme na dashboardu
  shouldBeOnDashboard() {
    this.dashboardContent.get().should("be.visible");
    return this;
  }

  // ověříme viditelnost odkazu Účty
  shouldHaveAccountsNav() {
    this.navUcty.get().should("be.visible");
    return this;
  }

  // klik a přechod do sekce Účty – // TODO: Implementace tlačítka 'Účty' chybí – test zatím nelze dokončit
  goToAccounts() {
    cy.log("Tlačítko 'Účty' není zatím implementováno – přeskakuji přechod.");
    return new AccountsSection();
  }

  // úplný E2E krok pro založení účtu
  createAccount({ startBalance, type }) {
    this.addAccountButton.get().click();
    this.accountBalanceInput.get().clear().type(String(startBalance));
    this.accountTypeSelect.get().select(type);
    this.submitAccountButton.get().click();
    return this;
  }

  // validace posledního řádku tabulky účtů - // TODO: Implementace tlačítka 'Účty' chybí – test zatím nelze dokončit
  validateAccount({ accountNumber, balance, type }) {
    this.accountRow.get().should("be.visible");
    if (accountNumber != null) {
      this.accountNumberValue.get().should("have.text", String(accountNumber));
    }
    this.accountBalanceValue
      .get()
      .invoke("text")
      .then((raw) => {
        const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
        expect(parseFloat(normalized)).to.eq(Number(balance));
      });
    this.accountTypeValue.get().should("have.text", String(type));
    return this;
  }

  // logout a návrat na login
  logout() {
    this.logoutButton.get().click();
    return this;
  }

  shouldBeLoggedOut() {
    this.loginMarker.get().should("be.visible");
    return this;
  }
}
