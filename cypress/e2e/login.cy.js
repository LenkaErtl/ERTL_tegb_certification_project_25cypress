import { DashboardPage } from "../support/page_objects/tegb_page_objects/dashboard_page.js";

describe("TEGB – Přihlášení a přechod na dashboard", () => {
  const dashboardPage = new DashboardPage();

  it("Uživatel se úspěšně přihlásí a odhlásí", () => {
    const user = {
      loginname: Cypress.env("username"),
      password: Cypress.env("password"),
    };

    dashboardPage
      .login(user)
      .shouldBeOnDashboard()
      .logout()
      .shouldBeLoggedOut();
  });
});
