import { fakerCS_CZ as faker } from "@faker-js/faker";

const removeDiacritics = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const generateUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const unique = Date.now() + "_" + faker.number.int({ min: 1000, max: 9999 });

  // očistíme jména od diakritiky
  const cleanFirst = removeDiacritics(firstName).toLowerCase();
  const cleanLast = removeDiacritics(lastName).toLowerCase();

  const rawLocalPart = `${cleanFirst}.${cleanLast}.${unique}`.replace(
    /[^a-z0-9._-]/g,
    ""
  ); // povolíme jen bezpečné znaky

  return {
    firstName,
    lastName,
    email: `${rawLocalPart}@example.com`,
    loginname: `${cleanFirst}_${cleanLast}_${unique}`.slice(0, 15),
    phone: faker.phone.number("+420 ### ### ###"),
    age: faker.number.int({ min: 18, max: 99 }),
    address: faker.location.streetAddress(),
    city: faker.location.city().length < 3 ? "Brno" : faker.location.city(),
    zip: faker.location.zipCode(),
    password: faker.internet.password({ length: 12 }),
  };
};
