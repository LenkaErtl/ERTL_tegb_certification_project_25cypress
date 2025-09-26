import { customElement } from "../../helpers/custom_element.js";
import { AccountsPage } from "./accounts_page.js";
import { ProfileSection } from "./profile_section.js";

export class DashboardPage {
  constructor() {
    this.dashboardContent = customElement('[data-testid="dashboard-content"]');
  }

  login({ loginname, password }) {
    cy.visit(Cypress.config("baseUrl"));
    cy.get('form input[type="text"]').clear().type(loginname);
    cy.get('form input[type="password"]').clear().type(password);
    cy.contains("Přihlásit se").click();
    return this;
  }

  shouldBeOnDashboard() {
    cy.url().should("include", "/dashboard");
    cy.get("button.logout-link", { timeout: 20000 })
      .should("be.visible")
      .and("contain.text", "Odhlásit se");
    return this;
  }

  goToAccounts() {
    cy.contains("Účty").click();
    return new AccountsPage();
  }

  goToProfile() {
    cy.contains("Profil").click();
    return new ProfileSection();
  }

  logout() {
    cy.location("pathname").then((path) => {
      if (path.includes("/dashboard")) {
        cy.get("button.logout-link", { timeout: 15000 })
          .should("be.visible")
          .and("contain.text", "Odhlásit se")
          .click();
      } else {
        cy.log(
          "Nejsem na /dashboard – tlačítko Odhlásit se není dostupné, krok přeskočen"
        );
      }
    });
    return this;
  }

  shouldBeLoggedOut() {
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.contains("Přihlásit se", { timeout: 10000 }).should("be.visible");
    return this;
  }
}
