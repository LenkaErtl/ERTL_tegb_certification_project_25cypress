// cypress/support/page_objects/tegb_page_objects/dashboard_page.js

import { customElement } from "../../helpers/custom_element.js";
import { LoginPage } from "./login_page.js";
import { AccountsSection } from "./accounts_section.js";
import { ProfileSection } from "./profile_section.js";

export class DashboardPage {
  constructor() {
    // základní obsah dashboardu
    this.dashboardContent = customElement("[data-testid='dashboard-content']");

    // titulek aplikace
    this.appTitle = customElement("span[data-testid='app-title']");

    // prvky sekce Účty
    this.accountsTitle = customElement("h2[data-testid='accounts-title']");
    this.accountNumberHeading = customElement(
      "th[data-testid='account-number-heading']"
    );
    this.accountBalanceHeading = customElement(
      "th[data-testid='account-balance-heading']"
    );
    this.accountTypeHeading = customElement(
      "th[data-testid='account-type-heading']"
    );
    this.addAccountButton = customElement(
      "button[data-testid='add-account-button']"
    );

    // prvky sekce Profil – podle skutečného DOMu
    this.profileTitle = customElement(
      "h2[data-testid='profile-details-title']"
    );
    this.nameLabel = customElement("div[data-testid='name'] strong");
    this.surnameLabel = customElement("div[data-testid='surname'] strong");
    this.emailLabel = customElement("div[data-testid='email'] strong");
    this.phoneLabel = customElement("div[data-testid='phone'] strong");
    this.ageLabel = customElement("div[data-testid='age'] strong");
    this.editProfileButton = customElement("button.profile-action");

    // logout
    this.logoutButton = customElement("[data-testid='logout-button']");
  }

  // ověří, že jsme na dashboardu
  shouldBeOnDashboard() {
    this.dashboardContent.get().should("be.visible");
    return this;
  }

  // sanity checky – ověření, že sekce Účty je viditelná
  accountsSectionIsVisible() {
    this.accountsTitle.get().should("contain.text", "Účty");
    this.accountNumberHeading.get().should("be.visible");
    this.accountBalanceHeading.get().should("be.visible");
    this.accountTypeHeading.get().should("be.visible");
    this.addAccountButton.get().should("be.visible");
    return this;
  }

  // kliknutí na tlačítko Upravit profil
  clickEditProfileButton() {
    this.editProfileButton.get().should("be.visible").click();
    return this;
  }

  // ověření, že se zobrazil formulář pro úpravu profilu
  profileFormIsVisible() {
    cy.get("form").should("be.visible"); // případně upřesni selektor formuláře
    return this;
  }

  // přechod do sekce Účty
  goToAccounts() {
    this.addAccountButton.get().click();
    return new AccountsSection();
  }

  // přechod do sekce Profil
  goToProfile() {
    return new ProfileSection();
  }

  // odhlášení – klikne na tlačítko a vrátí LoginPage
  clickLogout() {
    this.logoutButton.get().click();
    return new LoginPage();
  }
}
