import { faker } from "@faker-js/faker";
import { UserApi } from "../../support/api/user_api";

describe("User API – Register and Login", () => {
  const userApi = new UserApi();
  const user = {
    username: faker.internet.username(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };

  it("should register and login user via API", () => {
    userApi.register(user).then((regRes) => {
      expect(regRes.status).to.eq(201);

      userApi.login(user).then((loginRes) => {
        expect(loginRes.status).to.eq(201);
        const token = loginRes.body.access_token;
        expect(token).to.be.a("string");

        // Logout endpoint neexistuje – test končí zde
      });
    });
  });
});
