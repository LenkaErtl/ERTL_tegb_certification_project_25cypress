import { customElement } from "../../helpers/custom_element.js";
import { AccountsPage } from "./accounts_page.js";

export class DashboardPage {
  constructor() {
    // Pokud někdy přidáš data-testid, můžeš to vrátit zpět na customElement
    this.dashboardContent = customElement('[data-testid="dashboard-content"]');
  }

  login({ loginname, password }) {
    cy.visit(Cypress.env("frontendUrl"));
    cy.get('form input[type="text"]').clear().type(loginname);
    cy.get('form input[type="password"]').clear().type(password);
    cy.contains("Přihlásit se").click();
    return this;
  }

  shouldBeOnDashboard() {
    cy.url().should("match", /\/($|dashboard)/);
    cy.contains("Odhlásit se").should("be.visible");
    return this;
  }

  goToAccounts() {
    cy.contains("Účty").click();
    return new AccountsPage();
  }

  logout() {
    cy.contains("Odhlásit se").click();
    return this;
  }

  shouldBeLoggedOut() {
    cy.url().should((url) => {
      expect(url.replace(/\/$/, "")).to.eq(
        Cypress.env("frontendUrl").replace(/\/$/, "")
      );
    });
    cy.contains("Přihlásit se").should("exist");
    return this;
  }
}
