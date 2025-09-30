export class ProfileSection {
  constructor() {
    this.firstNameInput = () => cy.get('[data-testid="chage-name-input"]');
    this.lastNameInput = () => cy.get('[data-testid="chage-surname-input"]');
    this.emailInput = () => cy.get('[data-testid="chage-email-input"]');
    this.phoneInput = () => cy.get('[data-testid="chage-phone-input"]');
    this.ageInput = () => cy.get('[data-testid="chage-age-input"]');
    this.saveButton = () => cy.get('[data-testid="save-changes-button"]');
    this.editButton = () =>
      cy.get('[data-testid="toggle-edit-profile-button"]');
  }

  openEdit() {
    this.editButton().click();
    cy.get('[data-testid="chage-name-input"]').should("be.visible");
    return this;
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
    cy.intercept("PATCH", "**/tegb/profile").as("saveProfileResponse");
    this.saveButton().click();
    cy.wait("@saveProfileResponse").then((response) => {
      expect(response.response.statusCode).to.eq(200);
    });
    return this;
  }

  verifyProfile({ firstName, lastName, email, phone, age }) {
    cy.get('[data-testid="name"]').should("contain", firstName);
    cy.get('[data-testid="surname"]').should("contain", lastName);
    cy.get('[data-testid="email"]').should("contain", email);
    cy.get('[data-testid="phone"]').should("contain", phone);
    cy.get('[data-testid="age"]').should("contain", age.toString());
    return this;
  }

  // aliasy pro E2E test
  updateProfile(profileData) {
    return this.openEdit().fillProfile(profileData).submit();
  }

  verifyProfileUpdated(profileData) {
    return this.verifyProfile(profileData);
  }
}
