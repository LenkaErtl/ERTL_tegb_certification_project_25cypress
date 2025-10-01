import { customElement } from "../../helpers/custom_element.js";
import { AccountsSection } from "./accounts_section.js";
import { ProfileSection } from "./profile_section.js";

export class DashboardPage {
  constructor() {
    this.dashboardContent = customElement("[data-testid='dashboard-content']");
    this.logoutButton = customElement("[data-testid='logout-button']");
    this.accountsLink = customElement("[data-testid='nav-accounts'] a");
    this.profileLink = customElement(
      "[data-testid='toggle-edit-profile-button']"
    );
    this.loader = customElement("[data-testid='loader']");
    this.addAccountButton = customElement("[data-testid='add-account-button']");
    this.loginMarker = customElement("[data-testid='username-input']");

    // Hlavička
    this.logo = customElement("[data-testid='logo-img']");
    this.appTitle = customElement("[data-testid='app-title']");

    // Levé menu
    this.navHome = customElement("[data-testid='nav-home']");
    this.navAccounts = customElement("[data-testid='nav-accounts']");
    this.navTransactions = customElement("[data-testid='nav-transactions']");
    this.navSupport = customElement("[data-testid='nav-support']");

    // Profilová sekce – labely
    this.profileTitle = customElement("[data-testid='profile-details-title']");
    this.nameLabel = customElement("[data-testid='name']");
    this.surnameLabel = customElement("[data-testid='surname']");
    this.emailLabel = customElement("[data-testid='email']");
    this.editProfileButton = customElement(
      "[data-testid='toggle-edit-profile-button']"
    );

    // Profilová sekce – hodnoty
    this.profileNameValue = customElement("[data-testid='profile-name']");
    this.profileSurnameValue = customElement("[data-testid='profile-surname']");
    this.profileEmailValue = customElement("[data-testid='profile-email']");
    this.profilePhoneValue = customElement("[data-testid='profile-phone']");

    // Formulář profilu
    this.profileForm = customElement("[data-testid='account-summary']");

    // Účty – hlavičky
    this.accountsTitle = customElement("[data-testid='accounts-title']");
    this.accountNumberLabel = customElement(
      "[data-testid='label-account-number']"
    );
    this.accountBalanceInput = customElement(
      "[data-testid='start-balance-input']"
    );
    this.accountTypeSelect = customElement(
      "[data-testid='account-type-select']"
    );
    this.submitAccountButton = customElement(
      "[data-testid='submit-account-button']"
    );
    this.accountBalanceLabel = customElement(
      "[data-testid='label-account-balance']"
    );
    this.accountTypeLabel = customElement("[data-testid='label-account-type']");

    // Účty – hodnoty
    this.accountNumberValue = customElement("[data-testid='account-number']");
    this.accountBalanceValue = customElement("[data-testid='account-balance']");
    this.accountTypeValue = customElement("[data-testid='account-type']");
    this.accountRow = customElement("[data-testid='account-row']");

    // Login inputy po odhlášení
    this.passwordMarker = customElement("[data-testid='password-input']");
    this.submitMarker = customElement("[data-testid='submit-button']");
  }

  shouldBeOnDashboard() {
    this.dashboardContent.get().should("be.visible");
    return this;
  }

  goToAccounts() {
    this.accountsLink.get().click();
    return new AccountsSection();
  }

  goToProfile() {
    this.profileLink.get().click();
    return new ProfileSection();
  }

  logout() {
    this.logoutButton.get().should("be.visible").click();
    return this;
  }

  shouldBeLoggedOut() {
    this.loginMarker.get().should("be.visible");
    return this;
  }

  clickEditProfileButton() {
    this.editProfileButton.get().click();
    return new ProfileSection();
  }

  profileFormIsVisible() {
    this.profileForm.get().should("be.visible");
    return this;
  }

  createAccount({ startBalance, type }) {
    this.addAccountButton.get().click();
    this.accountBalanceInput
      .get()
      .should("exist")
      .clear()
      .type(startBalance.toString());
    this.accountTypeSelect.get().select(type);
    this.submitAccountButton.get().click();
    return this;
  }

  verifyAccountSummary({ accountNumber, balance, type }) {
    this.accountsTitle.get().should("be.visible");
    this.accountNumberValue.get().should("have.text", accountNumber);
    this.accountBalanceValue.get().should("have.text", `${balance} CZK`);
    this.accountTypeValue.get().should("have.text", type);
    return this;
  }

  verifyAccountBalance(expectedBalance) {
    this.accountsTitle.get().should("be.visible");
    this.accountBalanceValue
      .get()
      .should("have.text", `${expectedBalance} CZK`);
    return this;
  }
}
