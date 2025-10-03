// cypress/support/page_objects/tegb_page_objects/dashboard_page.js

import { customElement } from "../../helpers/custom_element.js";
import { LoginPage } from "./login_page.js";
import { AccountsSection } from "./accounts_section.js";
import { ProfileSection } from "./profile_section.js";

export class DashboardPage {
  constructor() {
    // základní ověření, že jsme na dashboardu
    this.dashboardContent = customElement("[data-testid='dashboard-content']");

    // hlavní navigace
    this.navDomu = customElement("[data-testid='nav-domu']");
    this.navUcty = customElement("[data-testid='nav-ucty']");
    this.navTransakce = customElement("[data-testid='nav-transakce']");
    this.navPodpora = customElement("[data-testid='nav-podpora']");

    // logout
    this.logoutButton = customElement("[data-testid='logout-button']");
  }

  // ověří, že jsme na dashboardu
  shouldBeOnDashboard() {
    this.dashboardContent.get().should("be.visible");
    return this;
  }

  // přechod do sekce Účty – klikne na boční menu
  goToAccounts() {
    this.navUcty.get().click();
    return new AccountsSection();
  }

  // přechod do sekce Profil
  goToProfile() {
    this.navDomu.get().click();
    return new ProfileSection();
  }

  // odhlášení – klikne na tlačítko a vrátí LoginPage
  clickLogout() {
    cy.contains("button", "Odhlásit se").click();
    return new LoginPage();
  }
}
