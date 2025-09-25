import { customElement } from "../../helpers/custom_element.js";

export class AccountsPage {
  constructor() {
    this.titleHeader = customElement('[data-testid="accounts-title"]');
    this.accountCard = customElement('[data-testid="account_card"]');
    this.accountBalance = customElement('[data-testid="account_balance"]');
    this.accountCurrency = customElement('[data-testid="account_currency"]');
  }

  shouldBeVisible() {
    this.titleHeader.isVisible();
    return this;
  }

  shouldHaveTitle(expectedTitle) {
    this.titleHeader.haveText(expectedTitle);
    return this;
  }

  shouldShowAccountCard() {
    this.accountCard.isVisible();
    return this;
  }

  shouldShowBalance(amount) {
    this.accountBalance.containsText(`${amount}`);
    return this;
  }

  shouldShowCurrency(currency) {
    this.accountCurrency.containsText(currency);
    return this;
  }

  shouldShowAccountDetails({ balance, currency }) {
    return this.shouldShowAccountCard()
      .shouldShowBalance(balance)
      .shouldShowCurrency(currency);
  }
}
