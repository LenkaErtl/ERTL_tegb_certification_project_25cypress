describe("API Test – Přihlášení a vytvoření účtu", () => {
  it("1. Přihlášení přes API – status 201 a token, vytvoření účtu", () => {
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
      expect(response.status).to.eq(201);
      expect(response.body)
        .to.have.property("access_token")
        .and.to.be.a("string");

      const token = response.body.access_token;

      cy.request({
        method: "POST",
        url: "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: {
          startBalance: 10000,
          type: "Test",
        },
      }).then((accountRes) => {
        expect(accountRes.status).to.eq(201);
        expect(accountRes.body).to.have.property("accountNumber");
        expect(accountRes.body.balance).to.eq(10000);
        cy.log("Účet vytvořen:", accountRes.body.accountNumber);
      });
    });
  });
});
