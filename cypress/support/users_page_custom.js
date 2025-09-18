import { customElement } from "../../helpers/custom_element.js";

export class UsersPageCustom {
  constructor() {
    this.pageTitle = customElement("h1"); // Nadpis stránky
    this.addUserButton = customElement("button[data-testid='add-user']"); // Tlačítko 'Add User'
  }

  visit() {
    cy.visit("/users");
    return this;
  }
}
