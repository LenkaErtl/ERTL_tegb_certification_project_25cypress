// cypress/support/page_objects/tegb_page_objects/profile_section.js

import { customElement } from "../../helpers/custom_element.js";

export class ProfileSection {
  constructor() {
    // tlačítko pro editaci profilu
    this.editButton = customElement("button.profile-action");

    // inputy pro změnu údajů
    this.firstNameInput = customElement(
      "input[data-testid='chage-name-input']"
    );
    this.lastNameInput = customElement(
      "input[data-testid='chage-surname-input']"
    );
    this.emailInput = customElement("input[data-testid='chage-email-input']");
    this.phoneInput = customElement("input[data-testid='chage-phone-input']");
    this.ageInput = customElement("input[data-testid='chage-age-input']");

    // tlačítko pro uložení změn
    this.saveButton = customElement(
      "button[data-testid='save-changes-button']"
    );
  }

  clickEditProfile() {
    this.editButton.get().should("be.visible").click();
    // ověříme, že se objeví první input
    this.firstNameInput.get().should("be.visible");
    return this;
  }

  typeFirstName(value) {
    this.firstNameInput.get().clear().type(value);
    return this;
  }

  typeLastName(value) {
    this.lastNameInput.get().clear().type(value);
    return this;
  }

  typeEmail(value) {
    this.emailInput.get().clear().type(value);
    return this;
  }

  typePhone(value) {
    this.phoneInput.get().clear().type(value);
    return this;
  }

  typeAge(value) {
    this.ageInput.get().clear().type(String(value));
    return this;
  }

  clickSave() {
    this.saveButton.get().should("be.enabled").click();
    return this;
  }

  shouldSeeProfileUpdated({ firstName, lastName, email, phone, age }) {
    this.firstNameInput.get().should("have.value", firstName);
    this.lastNameInput.get().should("have.value", lastName);
    this.emailInput.get().should("have.value", email);
    this.phoneInput.get().should("have.value", phone);
    this.ageInput.get().should("have.value", String(age));
    return this;
  }
}
