import { customElement } from "../../helpers/custom_element.js";

export class AccountsSection {
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
    this.accountCard.get().should("be.visible");
    return this;
  }

  shouldShowBalance(amount) {
    this.accountBalance.get().should("have.text", `${amount} CZK`);
    return this;
  }

  shouldShowCurrency(currency) {
    this.accountCurrency.get().should("have.text", currency);
    return this;
  }

  shouldShowAccountDetails({ balance, currency }) {
    return this.shouldShowAccountCard()
      .shouldShowBalance(balance)
      .shouldShowCurrency(currency);
  }

  createAccount({ startBalance, type }) {
    this.addAccountButton.get().click();
    this.startBalanceInput
      .get()
      .should("exist")
      .should("be.visible")
      .clear()
      .type(startBalance.toString());
    this.typeSelect.get().select(type);
    this.submitButton.get().click();
    return this;
  }

  verifyAccountCreated(expectedBalance) {
    this.accountCard.get().should("be.visible");
    this.accountBalance.get().should("have.text", `${expectedBalance} CZK`);
    return this;
  }
}
