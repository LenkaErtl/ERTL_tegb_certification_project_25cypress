// cypress/support/helpers/custom_element.js

export const customElement = (selector) => {
  const get = () => cy.get(selector);

  return {
    get,

    click() {
      get().click();
      return this;
    },
    type(val) {
      get().clear().type(val);
      return this;
    },
    shouldBeVisible() {
      get().should("be.visible");
      return this;
    },
    shouldExist() {
      get().should("exist");
      return this;
    },
    haveText(txt) {
      get().should("have.text", txt);
      return this;
    },
  };
};
