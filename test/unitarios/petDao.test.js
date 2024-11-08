import Pets from "../../src/dao/Pets.dao.js";
import { expect } from "chai";

// Describir nuestro test
describe("Test Pet Dao", () => {
    const petDao = new Pets();
    let petTest;

    // Método que se ejecuta antes de todos los tests
    before(() => {
        console.log("Inicio de todos los tests");
    });

    // Método que se ejecuta antes de cada test
    beforeEach(() => {
        console.log("Se ejecuta un test individual");
    });

    // Test individual - Individual Test
    it("Debe retornar todas las mascotas", async () => {
        const users = await petDao.get();
        expect(users).to.be.an("array");
        expect(users).to.be.not.an("object");
    });

    it("Debe crear y retornar una mascota", async () => {
        const newPet = {
            name: "Copito",
            specie: "Dog",
            birthDate: new Date(),
            adopted: false,
            owner: null,
            image: "dog.png",
        };

        const pet = await petDao.save(newPet);
        petTest = pet;
        // Afirmación
        expect(pet).to.be.an("object");
        expect(pet).to.have.property("_id");
        expect(pet.name).to.be.equal(newPet.name);
        expect(pet.specie).to.be.equal(newPet.specie);
        expect(pet.birthDate).to.be.equal(newPet.birthDate);
        expect(pet.adopted).to.be.equal(newPet.adopted);
        expect(pet.owner).to.be.equal(newPet.owner);
        expect(pet.image).to.be.equal(newPet.image);

        // Negación
        expect(pet).to.not.have.property("age");
        expect(pet).to.not.be.null;
        expect(pet).to.not.be.an("array");
    });

    it("Debe retornar una mascota por su id", async () => {
        const pet = await petDao.getBy(petTest._id);
        expect(pet).to.be.an("object");
        expect(pet).to.have.property("_id");
        expect(pet.name).to.be.equal(petTest.name);
        expect(pet.specie).to.be.equal(petTest.specie);
        expect(pet.email).to.be.equal(petTest.email);
        expect(pet.adopted).to.be.equal(petTest.adopted);
    });

    it("Debe actualizar una mascota", async () => {
        const updateData = {
            name: "Copito Modif",
            adopted: true,
        };

        const pet = await petDao.update(petTest._id, updateData);
        expect(pet).to.be.an("object");
        expect(pet).to.have.property("_id");
        expect(pet.name).to.be.equal("Copito Modif");
        expect(pet.adopted).to.be.equal(true);
    });

    it("Debe eliminar una mascota", async () => {
        await petDao.delete(petTest._id);
        const pet = await petDao.getBy(petTest._id);
        expect(pet).to.be.null;
    })

    // Método que se ejecuta al finaliza cada test
    afterEach(() => {
        console.log("Test individual finalizado");
    });

    // Método que se ejecuta al finalizar todos los test
    after(async () => {
        console.log("Tests finalizados");
    });
});
