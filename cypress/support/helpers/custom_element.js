export const customElement = (selector) => {
  const get = () => cy.get(selector);

  // Akce
  const clear = () => get().clear();
  const type = (value) => get().type(value);
  const click = () => get().click();
  const forceClick = () => get().click({ force: true });
  const forceType = (value) => get().type(value, { force: true });

  // Viditelnost & stav
  const isVisible = () => get().should("be.visible");
  const isNotVisible = () => get().should("not.be.visible");
  const exist = () => get().should("exist");
  const isEnabled = () => get().should("be.enabled");
  const isDisabled = () => get().should("be.disabled");

  // Obsah
  const haveText = (text) => get().should("have.text", text);
  const containText = (text) => get().should("contain.text", text);
  const haveValue = (value) => get().should("have.value", value);
  const containValue = (value) =>
    get().should("have.value").and("contain", value);

  // Atributy
  const havePlaceholder = (placeholder) =>
    get().should("have.attr", "placeholder", placeholder);
  const haveAttribute = (attribute, value) =>
    get().should("have.attr", attribute, value);
  const haveClass = (className) => get().should("have.class", className);

  return {
    get,
    clear,
    type,
    click,
    forceClick,
    forceType,
    isVisible,
    isNotVisible,
    exist,
    isEnabled,
    isDisabled,
    haveText,
    containText,
    haveValue,
    containValue,
    havePlaceholder,
    haveAttribute,
    haveClass,
  };
};
