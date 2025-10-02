// cypress/support/page_objects/tegb_page_objects/accounts_section.js

import { customElement } from "../../helpers/custom_element.js";

export class AccountsSection {
  constructor() {
    // buňky řádků (nikoli hlavičky)
    this.numberCell = customElement("[data-testid='account-number']");
    this.balanceCell = customElement("[data-testid='account-balance']");
    this.typeCell = customElement("[data-testid='account-type']");
  }

  // ověříme, že v tabulce aspoň jedna buňka sloupce "Číslo účtu" existuje
  shouldShowAccountTable() {
    this.numberCell.get().should("have.length.greaterThan", 0);
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
