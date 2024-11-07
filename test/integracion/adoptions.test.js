import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api");

describe("Test de integración Adoptions", () => {
    let testPet;
    let testUser;
    let testAdoption;
    
    it("[GET] /api/adoptions - Debe devolver un array de adopciones", async () => {
        const { status, body } = await request.get("/adoptions");
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("array");
    });

    it("[POST] /api/users - Debe crear un nuevo usuario", async () => {
        const newUser = {
            first_name: "Pepe",
            last_name: "Perez",
            email: "pp102@gmail.com",
            password: "coder123",
            age: 30,
            birthDate: new Date(),
        };

        const { status, body } = await request.post("/users").send(newUser);
        testUser = body.payload;
        expect(status).to.be.equal(201);
    });

    it("[POST] /api/pets - Debe crear una nueva mascota", async () => {
        const newPet = {
            name: "Pet Test Adoption",
            specie: "Gato",
            birthDate: "10/10/2024",
            image: "image.png",
        };
        const { status, body } = await request.post("/pets").send(newPet);
        testPet = body.payload;
        expect(status).to.be.equal(201);
    });
    
    it("[POST] /api/adoptions - Debe crear una nueva adopción", async () => {
        const newAdoption = {
            owner: testUser._id,
            pet: testPet._id,
        };

        const { status, body } = await request.post(`/adoptions/${testUser._id}/${testPet._id}`).send(newAdoption);
        testAdoption = body.payload;
        // Afirmación
        expect(status).to.be.equal(201);
        expect(testAdoption).to.be.an("object");
        expect(testAdoption).to.have.property("_id");
        
    });

    it("[DELETE] /api/adoptions/:aid - Debe eliminar una mascota", async () => {
        const { status, body } = await request.delete(`/adoptions/${testAdoption._id}`);
        
        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal("pet deleted");
    });

    it("[DELETE] /api/users/:uid - Debe eliminar un usuario", async () => {
        const { status, body } = await request.delete(`/users/${testUser._id}`);

        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal("User deleted");
    });

    it("[DELETE] /api/pets/:pid - Debe eliminar una mascota", async () => {
        const { status, body } = await request.delete(`/pets/${testPet._id}`);

        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal("pet deleted");
    });
});
