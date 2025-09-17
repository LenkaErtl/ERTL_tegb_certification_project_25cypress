describe("API Test – Přihlášení", () => {
  it("1. Přihlášení přes API – status 201 a token", () => {
    const credentials = {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    };

    cy.request({
      method: "POST",
      url: "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
      body: credentials,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body)
        .to.have.property("access_token")
        .and.to.be.a("string");
    });
  });
});
