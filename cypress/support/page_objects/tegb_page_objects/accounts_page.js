import { customElement } from "../../helpers/custom_element.js";

export class AccountsPage {
  constructor() {
    this.accountCard = customElement('[data-testid="account_card"]');
    this.accountBalance = customElement('[data-testid="account_balance"]');
    this.accountCurrency = customElement('[data-testid="account_currency"]');
    this.startBalanceInput = customElement(
      '[data-testid="account-start-balance"]'
    );
    this.typeSelect = customElement('[data-testid="account-type"]');
    this.submitButton = customElement('[data-testid="account-submit"]');
    this.addAccountButton = customElement('[data-testid="add-account-button"]');
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

  createAccount({ startBalance, type }) {
    this.addAccountButton.click();
    this.startBalanceInput.should("be.visible").clear().type(startBalance);
    this.typeSelect.select(type);
    this.submitButton.click();
    return this;
  }

  verifyAccountCreated(expectedBalance) {
    this.accountCard.should("be.visible");
    this.accountBalance.should("contain", expectedBalance);
    return this;
  }
}
