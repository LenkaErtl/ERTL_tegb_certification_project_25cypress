// cypress/support/page_objects/tegb_page_objects/profile_section.js

import { customElement } from "../../helpers/custom_element.js";

export class ProfileSection {
  constructor() {
    this.profileForm = customElement("[data-testid='edit-profile-form']");
    this.firstNameInput = customElement("[data-testid='change-name-input']");
    this.lastNameInput = customElement("[data-testid='change-surname-input']");
    this.emailInput = customElement("[data-testid='change-email-input']");
    this.phoneInput = customElement("[data-testid='change-phone-input']");
    this.ageInput = customElement("[data-testid='change-age-input']");

    this.editButton = customElement(
      "[data-testid='toggle-edit-profile-button']"
    );
    this.saveButton = customElement("[data-testid='save-changes-button']");

    this.nameLabel = customElement("[data-testid='name']");
    this.surnameLabel = customElement("[data-testid='surname']");
    this.emailLabel = customElement("[data-testid='email']");
    this.phoneLabel = customElement("[data-testid='phone']");
    this.ageLabel = customElement("[data-testid='age']");
  }

  openEdit() {
    this.editButton.get().should("be.visible").click();
    this.profileForm.get().should("be.visible");
    return this;
  }

  fillProfileForm({ firstName, lastName, email, phone, age }) {
    this.firstNameInput.get().clear().type(firstName);
    this.lastNameInput.get().clear().type(lastName);
    this.emailInput.get().clear().type(email);
    this.phoneInput.get().clear().type(phone);
    this.ageInput.get().clear().type(String(age));
    return this;
  }

  submitProfileChanges() {
    this.saveButton.get().click();
    this.profileForm.get().should("not.exist");
    return this;
  }

  shouldSeeProfileUpdated({ firstName, lastName, email, phone, age }) {
    this.nameLabel.get().should("have.text", firstName);
    this.surnameLabel.get().should("have.text", lastName);
    this.emailLabel.get().should("have.text", email);
    this.phoneLabel.get().should("have.text", phone);
    this.ageLabel.get().should("have.text", String(age));
    return this;
  }
}
