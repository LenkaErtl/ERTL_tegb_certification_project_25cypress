// cypress/support/page_objects/tegb_page_objects/accounts_section.js

import { customElement } from "../../helpers/custom_element.js";

export class AccountsSection {
  constructor() {
    // hlavičky a titulek
    this.title = customElement("h2[data-testid='accounts-title']");
    this.numberHeading = customElement(
      "th[data-testid='account-number-heading']"
    );
    this.balanceHeading = customElement(
      "th[data-testid='account-balance-heading']"
    );
    this.typeHeading = customElement("th[data-testid='account-type-heading']");
    this.addAccountButton = customElement(
      "button[data-testid='add-account-button']"
    );

    // buňky řádků (nikoli hlavičky)
    this.numberCell = customElement("[data-testid='account-number']");
    this.balanceCell = customElement("[data-testid='account-balance']");
    this.typeCell = customElement("[data-testid='account-type']");

    // formulář pro vytvoření účtu
    this.startBalanceInput = customElement(
      "[data-testid='account-start-balance']"
    );
    this.typeSelect = customElement("[data-testid='account-type']");
    this.submitButton = customElement("[data-testid='account-submit']");
  }

  // ověření, že sekce účtů je viditelná
  shouldShowAccountsSection() {
    this.title.get().should("contain.text", "Účty");
    this.numberHeading.get().should("be.visible");
    this.balanceHeading.get().should("be.visible");
    this.typeHeading.get().should("be.visible");
    this.addAccountButton.get().should("be.visible");
    return this;
  }

  // vytvoření účtu přes UI
  createAccount(balance, type) {
    this.startBalanceInput
      .get()
      .should("be.visible")
      .clear()
      .type(String(balance));
    this.typeSelect.get().should("be.visible").select(type);
    this.submitButton.get().should("be.enabled").click();
    return this;
  }

  // validujeme poslední řádek: zůstatek a typ účtu
  verifyAccountCreated({ balance, type }) {
    this.numberCell
      .get()
      .last()
      .parents("tr")
      .within(() => {
        this.balanceCell
          .get()
          .invoke("text")
          .then((raw) => {
            const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
            expect(parseFloat(normalized)).to.eq(Number(balance));
          });

        this.typeCell.get().should("have.text", String(type));
      });
    return this;
  }
}
