import { customElement } from "../../helpers/custom_element.js";
import { AccountsPage } from "./accounts_page.js";
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

    this.accountBalanceLabel = customElement(
      "[data-testid='label-account-balance']"
    );
    
    this.accountTypeLabel = customElement("[data-testid='label-account-type']");

    // Účty – hodnoty
    this.accountNumberValue = customElement("[data-testid='account-number']");
    this.accountBalanceValue = customElement("[data-testid='account-balance']");
    this.accountTypeValue = customElement("table tbody tr td:nth-child(3)");
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
    return new AccountsPage();
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
    return this;
  }

  profileFormIsVisible() {
    this.profileForm.get().should("be.visible");
    return this;
  }

  verifyAccountSummary({ accountNumber, balance, type }) {
    this.accountsTitle.get().should("be.visible");
    this.accountNumberValue.get().should("contain", accountNumber);
    this.accountBalanceValue.get().should("contain", balance);
    this.accountTypeValue.get().should("contain", type);
    return this;
  }

  verifyAccountBalance(expectedBalance) {
    this.accountsTitle.get().should("be.visible");
    this.accountBalanceValue
      .get()
      .should("contain", expectedBalance.toString());
    return this;
  }
}
