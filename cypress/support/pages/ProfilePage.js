export class ProfilePage {
  openEditor() {
    cy.contains("Upravit profil").should("be.visible").click();
    return this;
  }

  fillProfile({ firstName, lastName, email, phone, age }) {
    cy.contains("label", "Jméno").next("input").clear().type(firstName);
    cy.contains("label", "Příjmení").next("input").clear().type(lastName);
    cy.contains("label", "Email").next("input").clear().type(email);
    cy.contains("label", "Telefon").next("input").clear().type(phone);
    cy.contains("label", "Věk").next("input").clear().type(age.toString());
    return this;
  }

  save() {
    cy.intercept("PATCH", "**/tegb/profile").as("saveProfile");
    cy.contains("Uložit změny").click();
    cy.wait("@saveProfile").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    return this;
  }

  verifyProfile({ firstName, lastName, email, phone, age }) {
    cy.contains(`Jméno: ${firstName}`).should("be.visible");
    cy.contains(`Příjmení: ${lastName}`).should("be.visible");
    cy.contains(`Email: ${email}`).should("be.visible");
    cy.contains(`Telefon: ${phone}`).should("be.visible");
    cy.contains(`Věk: ${age}`).should("be.visible");
    return this;
  }
}
