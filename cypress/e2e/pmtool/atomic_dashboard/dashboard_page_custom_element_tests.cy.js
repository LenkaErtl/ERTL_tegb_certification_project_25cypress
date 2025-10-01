import { DashboardPage } from "../../../support/page_objects/tegb_page_objects/dashboard_page.js";
import { LoginPage } from "../../../support/page_objects/tegb_page_objects/login_page.js";

describe("Dashboard – audit-ready testy", () => {
  const loginPage = new LoginPage();
  let dashboard;

  beforeEach(() => {
    loginPage.visit();
    dashboard = loginPage.login(); // přihlášení přes validní credentials
    dashboard.shouldBeOnDashboard(); // validace, že jsme na dashboardu
  });

  it("Logo a název aplikace", () => {
    dashboard.logo.get().should("be.visible");
    dashboard.appTitle.get().should("contain.text", "TEG#B");
    dashboard.logoutButton.get().should("be.visible");
  });

  it.skip("Levé menu obsahuje všechny položky – není implementováno nebo není renderováno", () => {
    dashboard.navHome.get().should("contain.text", "Domů");
    dashboard.navAccounts.get().should("contain.text", "Účty");
    dashboard.navTransactions.get().should("contain.text", "Transakce");
    dashboard.navSupport.get().should("contain.text", "Podpora");
    // TODO: Aktivovat až bude levé menu dostupné v DOM
  });

  it("Profilová sekce obsahuje nadpis, labely a tlačítko", () => {
    dashboard.profileTitle.get().should("be.visible");
    dashboard.nameLabel.get().should("contain.text", "Jméno");
    dashboard.surnameLabel.get().should("contain.text", "Příjmení");
    dashboard.emailLabel.get().should("contain.text", "Email");
    dashboard.editProfileButton.get().should("be.visible");
  });

  it.skip("Profilová sekce obsahuje hodnoty – není implementováno", () => {
    dashboard.profileNameValue.get().should("be.visible");
    dashboard.profileSurnameValue.get().should("be.visible");
    dashboard.profileEmailValue.get().should("be.visible");
    dashboard.profilePhoneValue.get().should("be.visible");
  });

  it("Kliknutí na Upravit profil zobrazí formulář", () => {
    dashboard.clickEditProfileButton();
    dashboard.profileFormIsVisible();
  });

  it.skip("Účty – nadpis a hlavičky tabulky – není implementováno", () => {
    dashboard.accountsTitle.get().should("be.visible");
    dashboard.accountNumberLabel.get().should("be.visible");
    dashboard.accountBalanceLabel.get().should("be.visible");
    dashboard.accountTypeLabel.get().should("be.visible");
  });

  it.skip("Účty – řádky účtů (pokud existují) – není implementováno", () => {
    dashboard.accountRow.get().should("exist");
  });

  it("Účty – tlačítko Přidat účet", () => {
    dashboard.addAccountButton.get().should("be.visible");
  });

  it("Odhlášení a návrat na login stránku", () => {
    dashboard.logout();
    cy.url().should("eq", "https://tegb-frontend-88542200c6db.herokuapp.com/");
    cy.get("input[name='username']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("button[type='submit']").should("be.visible");
  });
});
