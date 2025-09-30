describe("Atomické testy na Dashboard", () => {
  // Před každým testem se přihlásíme a dostaneme na dashboard
  beforeEach(() => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");

    cy.visit(Cypress.config("baseUrl"));
    cy.get("form input[type='text']").clear().type(username);
    cy.get("form input[type='password']").clear().type(password);
    cy.contains("Přihlásit se").click();
    cy.url().should("include", "/dashboard");
  });

  it("1. Kontrola viditelnosti a textu v hlavičce", () => {
    cy.get("[data-testid='logo-img']").should("be.visible");
    cy.get(".app-title").should("contain.text", "TEG#B Dashboard");
    cy.get("button.logout-link")
      .should("be.visible")
      .and("contain.text", "Odhlásit se");
  });

  it("2. Kontrola levého menu a jeho položek", () => {
    cy.get("aside.dashboard-sidebar").should("be.visible");
    cy.contains("aside.dashboard-sidebar li", "Domů").should("be.visible");
    cy.contains("aside.dashboard-sidebar li", "Účty").should("be.visible");
    cy.contains("aside.dashboard-sidebar li", "Transakce").should("be.visible");
    cy.contains("aside.dashboard-sidebar li", "Podpora").should("be.visible");
  });

  it("3. Kontrola obsahu dashboardu - sekce Profil a Účty", () => {
    // Profil
    cy.get("[data-testid='profile-details-title']").should("be.visible");
    cy.contains("Upravit profil").should("be.visible");

    // Účty
    cy.get(".accounts-header h2").should("be.visible");
    cy.contains("Přidat účet").should("be.visible");
  });

  it("4. Kontrola funkčnosti odhlášení (click)", () => {
    cy.get("button.logout-link").should("be.visible").click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.contains("Přihlásit se").should("exist");
  });

  it.skip("5. Další test, který je přeskočen z důvodu neimplementované funkcionality", () => {
    cy.log("Tento test je přeskočen, protože funkcionalita není k dispozici.");
  });
});
