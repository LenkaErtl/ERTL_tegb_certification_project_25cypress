import { fakerCS_CZ as faker } from "@faker-js/faker";

export const generateUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    loginname: faker.internet
      .userName({ firstName, lastName })
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 10),
    phone: faker.phone.number("+420 ### ### ###"),
    age: faker.number.int({ min: 18, max: 99 }),
    address: faker.location.streetAddress(),
    city: faker.location.city().length < 3 ? "Brno" : faker.location.city(),
    zip: faker.location.zipCode(),
    password: faker.internet.password(12),
  };
};
