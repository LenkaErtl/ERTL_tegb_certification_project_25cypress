import { customElement } from "../../helpers/custom_element.js";

export class ProfilePage {
  constructor() {
    this.firstNameInput = () => cy.get('[name="firstName"]');
    this.lastNameInput = () => cy.get('[name="lastName"]');
    this.emailInput = () => cy.get('[name="email"]');
    this.phoneInput = () => cy.get('[name="phone"]');
    this.ageInput = () => cy.get('[name="age"]');
    this.saveButton = () => cy.contains("Uložit změny");
  }

  fillProfile({ firstName, lastName, email, phone, age }) {
    this.firstNameInput().clear().type(firstName);
    this.lastNameInput().clear().type(lastName);
    this.emailInput().clear().type(email);
    this.phoneInput().clear().type(phone);
    this.ageInput().clear().type(age.toString());
    return this;
  }

  submit() {
    cy.intercept("PATCH", "**/tegb/profile").as("saveProfile");
    this.saveButton().click();
    cy.wait("@saveProfile").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    return this;
  }

  verifyProfile({ firstName, lastName, email, phone, age }) {
    cy.contains("Jméno").parent().should("contain", firstName);
    cy.contains("Příjmení").parent().should("contain", lastName);
    cy.contains("Email").parent().should("contain", email);
    cy.contains("Telefon").parent().should("contain", phone);
    cy.contains("Věk").parent().should("contain", age.toString());
    return this;
  }
}
