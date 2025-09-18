import { customElement } from "../../helpers/custom_element.js";
import { AccountsPage } from "./accounts_page.js";

export class DashboardPage {
  constructor() {
    cy.intercept("/accounts/user/**").as("accounts_api");
    this.accountsButton = customElement(
      '[data-testid="accounts_section_link"]'
    );
  }

  clickAccounts() {
    this.accountsButton.click();
    cy.wait("@accounts_api");
    return new AccountsPage();
  }
}
