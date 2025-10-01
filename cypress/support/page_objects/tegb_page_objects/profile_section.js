import { customElement } from "../../helpers/custom_element.js";

export class ProfileSection {
  constructor() {
    // samotný formulář
    this.profileForm = customElement("[data-testid='edit-profile-form']");

    // inputy
    this.firstNameInput = customElement("[data-testid='chage-name-input']");
    this.lastNameInput = customElement("[data-testid='chage-surname-input']");
    this.emailInput = customElement("[data-testid='chage-email-input']");
    this.phoneInput = customElement("[data-testid='chage-phone-input']");
    this.ageInput = customElement("[data-testid='chage-age-input']");

    // tlačítka
    this.saveButton = customElement("[data-testid='save-changes-button']");
    this.editButton = customElement(
      '[data-testid="toggle-edit-profile-button"]'
    );

    // labely
    this.nameLabel = customElement('[data-testid="name"]');
    this.surnameLabel = customElement('[data-testid="surname"]');
    this.emailLabel = customElement('[data-testid="email"]');
    this.phoneLabel = customElement('[data-testid="phone"]');
    this.ageLabel = customElement('[data-testid="age"]');
  }

  openEdit() {
    this.editButton.get().should("be.visible").click();
    this.profileForm.get().should("be.visible");
    this.firstNameInput.get().should("be.visible");
    return this;
  }

  // teď přijímá celý user objekt
  fillProfileForm(user) {
    const { firstName, lastName, email, phone, age } = user;
    this.firstNameInput.get().clear().type(firstName);
    this.lastNameInput.get().clear().type(lastName);
    this.emailInput.get().clear().type(email);
    this.phoneInput.get().clear().type(phone);
    this.ageInput.get().clear().type(age.toString());
    return this;
  }

  submitProfileChanges() {
    cy.intercept("PATCH", "**/tegb/profile").as("saveProfileResponse");
    this.saveButton.get().click();
    cy.wait("@saveProfileResponse")
      .its("response.statusCode")
      .should("eq", 200);
    return this;
  }

  shouldSeeProfileUpdated(user) {
    const { firstName, lastName, email, phone, age } = user;
    this.nameLabel.get().should("contain", firstName);
    this.surnameLabel.get().should("contain", lastName);
    this.emailLabel.get().should("contain", email);
    this.phoneLabel.get().should("contain", phone);
    this.ageLabel.get().should("contain", age);
    return this;
  }
}
