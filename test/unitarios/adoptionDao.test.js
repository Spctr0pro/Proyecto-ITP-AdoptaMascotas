import Adoptions from "../../src/dao/Adoption.dao.js";
import Users from "../../src/dao/Users.dao.js";
import Pets from "../../src/dao/Pets.dao.js";
import mongoose from "mongoose";
import { expect } from "chai";

mongoose.connect(`mongodb+srv://ivantorop:gO3HOAs3EmMmHj1V@cluster0.qbjax5p.mongodb.net/proyectoBackend3`);

// Describir nuestro test
describe("Test adoptionDao", () => {
    const adoptionDao = new Adoptions();
    const userDao = new Users();
    const petDao = new Pets();
    let adoptionTest;
    let userTest;
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
    it("Debe retornar todas las adopciones", async () => {
        const adoptions = await adoptionDao.get();
        expect(adoptions).to.be.an("array");
        expect(adoptions).to.be.not.an("object");
    });

    it("Debe crear y retornar una adopción", async () => {
        const newUser = {
            first_name: "Pepe",
            last_name: "Perez",
            email: "pp10@gmail.com",
            password: "coder123",
            age: 30,
            birthDate: new Date(),
        };

        const user = await userDao.save(newUser);
        userTest = user;

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

        const newAdoption = {
            owner: userTest._id,
            pet: petTest._id,
        };

        const adoption = await adoptionDao.save(newAdoption);
        adoptionTest = adoption;
        // Afirmación
        expect(adoption).to.be.an("object");
        expect(adoption).to.have.property("_id");

        // Negación
        expect(adoption).to.not.have.property("age");
        expect(adoption).to.not.have.property("birthDate");
        expect(adoption).to.not.be.an("array");
    });

    it("Debe retornar una adopción por su id", async () => {
        const adoption = await adoptionDao.getBy(adoptionTest._id);
        
        expect(adoption).to.be.an("object");
        expect(adoption).to.have.property("_id");
        expect(adoption).to.have.property("owner");
        expect(adoption).to.have.property("pet");
    });

    it("Debe eliminar la adopción", async () => {
        await adoptionDao.delete(adoptionTest._id);
        const adoption = await adoptionDao.getBy(adoptionTest._id);
        expect(adoption).to.be.null;
        await petDao.delete(petTest._id);
        await userDao.delete(userTest._id);
    })

    // Método que se ejecuta al finaliza cada test
    afterEach(() => {
        console.log("Test individual finalizado");
    });

    // Método que se ejecuta al finalizar todos los test
    after(async () => {
        console.log("Tests finalizados");
        //mongoose.disconnect();
    });
});
