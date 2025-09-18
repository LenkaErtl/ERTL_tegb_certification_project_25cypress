import { customElement } from "../../helpers/custom_element.js";

export class AccountsPage {
  constructor() {
    this.titleHeader = customElement('[data-testid="title"]');
    this.accountCard = customElement('[data-testid="account_card"]');
    this.accountBalance = customElement('[data-testid="account_balance"]');
    this.accountCurrency = customElement('[data-testid="account_currency"]');
  }

  titleHaveText(titleText) {
    this.titleHeader.haveText(titleText);
    return this;
  }

  verifyAccountVisible() {
    this.accountCard.isVisible();
    return this;
  }

  checkBalance(expectedAmount) {
    this.accountBalance.containsText(`${expectedAmount}`);
    return this;
  }

  checkCurrency(expectedCurrency) {
    this.accountCurrency.containsText(expectedCurrency);
    return this;
  }
}
