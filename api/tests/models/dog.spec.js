// const { Dog, conn } = require('../../src/db.js');
// const { expect } = require('chai');

// describe('Dog model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Dog.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Dog.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Dog.create({ name: 'Pug' });
//       });
//     });
//   });
// });

const { DataTypes } = require("sequelize");
const { conn } = require("../../src/db.js");
const defineDogModel = require("../../src/models/Dog");

describe("Dog Model", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    defineDogModel(conn);
  });

  afterAll(async () => {
    await conn.close();
  });

  it("should create a dog instance", async () => {
    const Dog = conn.models.Dog;
    const dogData = {
      name: "Max",
      origin: "Test Origin",
      height: "Test Height",
      weight: "Test Weight",
      life_span: "Test Lifespan",
      image: "test-image.jpg",
    };

    const dog = await Dog.create(dogData);

    expect(dog.name).toBe(dogData.name);
    expect(dog.origin).toBe(dogData.origin);
    expect(dog.height).toBe(dogData.height);
    expect(dog.weight).toBe(dogData.weight);
    expect(dog.life_span).toBe(dogData.life_span);
    expect(dog.image).toBe(dogData.image);
  });

  it("should update a dog instance", async () => {
    const Dog = conn.models.Dog;
    const dogData = {
      name: "Max",
      origin: "Test Origin",
      height: "Test Height",
      weight: "Test Weight",
      life_span: "Test Lifespan",
      image: "test-image.jpg",
    };

    const dog = await Dog.create(dogData);
    const updatedName = "Updated Max";

    await dog.update({ name: updatedName });

    expect(dog.name).toBe(updatedName);
  });

  it("should delete a dog instance", async () => {
    const Dog = conn.models.Dog;
    const dogData = {
      name: "Max",
      origin: "Test Origin",
      height: "Test Height",
      weight: "Test Weight",
      life_span: "Test Lifespan",
      image: "test-image.jpg",
    };

    const dog = await Dog.create(dogData);

    await dog.destroy();

    const deletedDog = await Dog.findByPk(dog.id);

    expect(deletedDog).toBeNull();
  });
});
