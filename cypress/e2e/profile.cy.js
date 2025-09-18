describe("Login Test", () => {
  it("should successfully log in and reach the dashboard", () => {
    const user = {
      loginname: Cypress.env("username"),
      password: Cypress.env("password"),
    };

    // Navštívíme hlavní stránku
    cy.visit(Cypress.env("tegb_url"));

    // Vyplníme přihlašovací formulář
    cy.get('[data-testid="username-input"]')
      .should("be.visible")
      .type(user.loginname);
    cy.get('[data-testid="password-input"]').type(user.password);

    // Odešleme formulář
    cy.get('[data-testid="submit-button"]').click();

    // Čekáme na načtení profilových dat
    cy.intercept("GET", "**/tegb/profile").as("getProfile");
    cy.wait("@getProfile");

    // Ověříme, že jsme na dashboardu
    cy.url().should("include", "/dashboard");
    cy.get("span.app-title")
      .should("be.visible")
      .and("have.text", "TEG#B Dashboard");

    // Odhlášení
    cy.get("#root > div > div > header > button").click();
    cy.url().should("not.include", "/dashboard"); // Ověření, že jsme odhlášeni
  });
});
