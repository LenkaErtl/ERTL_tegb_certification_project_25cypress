import { generateUser } from "../../support/helpers/faker_generator.js";
const balances = require("../../fixtures/account_balances.json");

describe("Data Driven Test – kontrola účtů s různými částkami", () => {
  balances.forEach((data, index) => {
    const { startBalance } = data;

    // Uživatelé 1–3: validní částky → očekáváme úspěšné vytvoření účtu
    if (Math.abs(startBalance) <= 100000000) {
      it(`Uživatel ${index + 1} → účet s částkou ${startBalance}`, () => {
        const user = generateUser();

        // Registrace uživatele
        cy.request(
          "POST",
          "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register",
          {
            username: user.loginname,
            password: user.password,
            email: user.email,
          }
        ).then((regRes) => {
          expect(regRes.status).to.eq(201);

          // Login pro získání tokenu
          cy.request(
            "POST",
            "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
            {
              username: user.loginname,
              password: user.password,
            }
          ).then((loginRes) => {
            expect(loginRes.status).to.eq(201);
            const token = loginRes.body.access_token;

            // Vytvoření účtu s danou částkou
            cy.request({
              method: "POST",
              url: "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create",
              headers: { Authorization: `Bearer ${token}` },
              body: {
                startBalance,
                type: "Test",
              },
            }).then((accountRes) => {
              expect(accountRes.status).to.eq(201);
              expect(Number(accountRes.body.balance)).to.eq(startBalance);

              // Ověření účtu přes GET /accounts
              cy.request({
                method: "GET",
                url: "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts",
                headers: { Authorization: `Bearer ${token}` },
              }).then((getRes) => {
                expect(getRes.status).to.eq(200);
                const account = getRes.body.find(
                  (acc) => acc.accountNumber === accountRes.body.accountNumber
                );
                expect(account).to.exist;
                expect(Number(account.balance)).to.eq(startBalance);

                cy.log(
                  ` ${user.loginname} → účet ${account.accountNumber} s částkou ${account.balance}`
                );
              });
            });
          });
        });
      });
    }

    // Uživatelé 4–5: extrémní částky → očekáváme chybu 500
    else {
      it(`Uživatel ${
        index + 1
      } → očekávaná chyba při částce ${startBalance}`, () => {
        const user = generateUser();

        cy.request(
          "POST",
          "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register",
          {
            username: user.loginname,
            password: user.password,
            email: user.email,
          }
        ).then(() => {
          cy.request(
            "POST",
            "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
            {
              username: user.loginname,
              password: user.password,
            }
          ).then((loginRes) => {
            const token = loginRes.body.access_token;

            // Pokus o vytvoření účtu s extrémní částkou
            cy.request({
              method: "POST",
              url: "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create",
              headers: { Authorization: `Bearer ${token}` },
              body: {
                startBalance,
                type: "Test",
              },
              failOnStatusCode: false, // očekáváme chybu
            }).then((res) => {
              expect(res.status).to.eq(500);
              cy.log(
                ` Backend správně odmítl částku ${startBalance} pro uživatele ${user.loginname}`
              );
            });
          });
        });
      });
    }
  });
});
