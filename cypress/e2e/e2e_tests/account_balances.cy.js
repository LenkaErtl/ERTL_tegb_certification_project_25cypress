import { generateUser } from "../../support/helpers/faker_generator.js";
import { AccountsApi } from "../../support/api/accounts_api.js";
const balances = require("../../fixtures/account_balances.json");

const api = new AccountsApi();

describe("Data Driven Test – kontrola účtů s různými částkami", () => {
  balances.forEach((data, index) => {
    const { startBalance } = data;
    const user = generateUser(); // vždy unikátní uživatel
    const isValid = Math.abs(startBalance) <= 100000000;
    const testFn = isValid ? it : it.skip;

    testFn(`Uživatel ${index + 1} → účet s částkou ${startBalance}`, () => {
      api.registerUser(user, { failOnStatusCode: false }).then((regRes) => {
        // povolíme i 400 (user already exists), ale očekáváme 201 při nové registraci
        expect([201, 400]).to.include(regRes.status);

        api.loginUser(user).then((loginRes) => {
          expect(loginRes.status).to.eq(201);
          const token = loginRes.body.access_token;

          api
            .createAccount(token, { startBalance, type: "Test" })
            .then((accountRes) => {
              expect(accountRes.status).to.eq(201);
              expect(Number(accountRes.body.balance)).to.eq(startBalance);

              api.getAccounts(token).then((getRes) => {
                expect(getRes.status).to.eq(200);
                const account = getRes.body.find(
                  (acc) => acc.accountNumber === accountRes.body.accountNumber
                );
                expect(account).to.exist;
                expect(Number(account.balance)).to.eq(startBalance);

                cy.log(
                  `✅ ${user.loginname} → účet ${account.accountNumber} s částkou ${account.balance}`
                );
              });
            });
        });
      });
    });

    const errorTestFn = !isValid ? it : it.skip;

    errorTestFn(
      `Uživatel ${index + 1} → očekávaná chyba při částce ${startBalance}`,
      () => {
        api.registerUser(user, { failOnStatusCode: false }).then(() => {
          api.loginUser(user).then((loginRes) => {
            const token = loginRes.body.access_token;

            api
              .createAccountExpectingError(token, {
                startBalance,
                type: "Test",
              })
              .then((res) => {
                expect(res.status).to.eq(500);
                cy.log(
                  `⚠️ Backend správně odmítl částku ${startBalance} pro uživatele ${user.loginname}`
                );
              });
          });
        });
      }
    );
  });
});
