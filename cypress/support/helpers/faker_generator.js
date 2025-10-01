import { fakerCS_CZ as faker } from "@faker-js/faker";

export const generateUser = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    phone: faker.phone.number("+420 ### ### ###"),
    age: faker.number.int({ min: 18, max: 99 }),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    zip: faker.location.zipCode(),
    password: faker.internet.password({ length: 12 }),
  };
};
