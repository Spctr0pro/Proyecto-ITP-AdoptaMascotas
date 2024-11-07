import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/users");

describe("Test de integración Users", () => {
    let testUser;
    it("[GET] /api/users - Debe devolver un array de usuarios", async () => {
        const { status, body } = await request.get("/");
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("array");
    });

    it("[POST] /api/users - Debe crear un nuevo usuario", async () => {
        const newUser = {
            first_name: "Pepe",
            last_name: "Perez",
            email: "pp101@gmail.com",
            password: "coder123",
            age: 30,
            birthDate: new Date(),
        };

        const { status, body } = await request.post("/").send(newUser);
        testUser = body.payload;
        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.first_name).to.be.equal("Pepe");
        expect(body.payload.last_name).to.be.equal("Perez");
        expect(body.payload.email).to.be.equal("pp101@gmail.com");
    });

    it("[PUT] /api/users/:uid - Debe actualizar un usuario", async () => {
        const updateData = {
            first_name: "Juan",
            password: "coder123",
        };

        const { status, body } = await request.put(`/${testUser._id}`).send(updateData);
        
        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload).to.have.property("_id");
        expect(body.payload.first_name).to.be.equal("Juan");
        expect(body.payload.password).to.be.equal("coder123");
    });

    it("[DELETE] /api/users/:uid - Debe eliminar un usuario", async () => {
        const { status, body } = await request.delete(`/${testUser._id}`);

        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal("User deleted");
    });
});
