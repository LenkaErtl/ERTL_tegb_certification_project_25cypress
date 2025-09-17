export class ProfilePage {
  constructor() {
    this.firstNameInput = () => cy.get("form input[type='text']").eq(0);
    this.lastNameInput = () => cy.get("form input[type='text']").eq(1);
    this.emailInput = () => cy.get("form input[type='text']").eq(2);
    this.phoneInput = () => cy.get("form input[type='text']").eq(3);
    this.ageInput = () => cy.get("form input[type='text']").eq(4);
    this.saveButton = () => cy.contains("Uložit změny");
    this.successMessage = () => cy.contains("Profil byl úspěšně uložen");
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
    this.saveButton().click();
    this.successMessage().should("exist");
    return this;
  }

  verifyProfile({ firstName, lastName, email, phone, age }) {
    cy.get(".profile-details > div").eq(0).should("contain", firstName);
    cy.get(".profile-details > div").eq(1).should("contain", lastName);
    cy.get(".profile-details > div").eq(2).should("contain", email);
    cy.get(".profile-details > div").eq(3).should("contain", phone);

    // Robustní validace věku bez závislosti na <strong>
    cy.get(".profile-details > div").eq(4).should("contain", age.toString());

    return this;
  }
}
