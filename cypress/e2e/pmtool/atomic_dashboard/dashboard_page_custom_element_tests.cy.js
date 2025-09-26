describe("Atomické testy na Dashboard", () => {
  // Před každým testem se přihlásíme a dostaneme na dashboard
  beforeEach(() => {
    const username = "FortunatPe";
    const password = "qWJGfHKtoJVf675";

    cy.visit("https://tegb-frontend-88542200c6db.herokuapp.com/");
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
    cy.get("aside.dashboard-sidebar li").eq(0).should("contain.text", "Domů");
    cy.get("aside.dashboard-sidebar li").eq(1).should("contain.text", "Účty");
    cy.get("aside.dashboard-sidebar li")
      .eq(2)
      .should("contain.text", "Transakce");
    cy.get("aside.dashboard-sidebar li")
      .eq(3)
      .should("contain.text", "Podpora");
  });

  it("3. Kontrola obsahu dashboardu - sekce Profil a Účty", () => {
    // OPRAVENO: Používáme selektory, které jsi mi poslal pro sekci Detaily Profilu
    cy.get("[data-testid='profile-details-title']").should("be.visible");

    // Ověření viditelnosti tlačítka "Upravit profil"
    cy.contains("Upravit profil").should("be.visible");

    // OPRAVENO: Používáme selektory, které jsi mi poslal pro sekci Účty
    cy.get(".accounts-header h2").should("be.visible");

    // Ověření viditelnosti tlačítka "Přidat účet"
    cy.contains("Přidat účet").should("be.visible");
  });

  it("4. Kontrola funkčnosti odhlášení (click)", () => {
    cy.get("button.logout-link").should("be.visible").click();
    cy.url().should("eq", "https://tegb-frontend-88542200c6db.herokuapp.com/");
    cy.contains("Přihlásit se").should("exist");
  });

  it.skip("5. Další test, který je přeskočen z důvodu neimplementované funkcionality", () => {
    cy.log("Tento test je přeskočen, protože funkcionalita není k dispozici.");
  });
});
