import { app } from "../src/index";
import request from "supertest";
import assert from "assert";

describe("Vehicles", () => {
  describe("Create", () => {
    it("It should create a vehicle with the correct parameters", async () => {
      const response = await request(app).post("/vehicles").send({
        id: "e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da",
        placa: "ABC1234",
        chassi: "7qs1yhxs0fq5uq7hs",
        renavam: "0123456789",
        modelo: "Tiggo 8",
        marca: "Caoa Chery",
        ano: 2022,
      });
      assert.strictEqual(response.status, 200);
    });

    it("It should not create a vehicle with missing parameters", async () => {
      const response = await request(app).post("/vehicles").send({
        renavam: "0123456789",
        modelo: "Tiggo 8",
        marca: "Caoa Chery",
        ano: 2022,
      });
      assert.strictEqual(response.status, 400);
    });

    it("It should not create a vehicle with an existing id, placa, chassi or renavam", async () => {
      const response = await request(app).post("/vehicles").send({
        id: "fadd3a1d-5828-41d4-b11a-747c789b5a8b",
        placa: "ZAB1234",
        chassi: "6qs1yhxs0fq5uq7hs",
        renavam: "9123456789",
        modelo: "Corolla XEi",
        marca: "Toyota",
        ano: 2020,
      });
      assert.strictEqual(response.status, 200);

      const responseForDuplicate = await request(app).post("/vehicles").send({
        id: "fadd3a1d-5828-41d4-b11a-747c789b5a8b",
        placa: "ZAB1234",
        chassi: "6qs1yhxs0fq5uq7hs",
        renavam: "9123456789",
        modelo: "Corolla XEi",
        marca: "Toyota",
        ano: 2020,
      });
      assert.strictEqual(responseForDuplicate.status, 400);
    });
  });

  describe("Read", () => {
    it("It should read vehicles", async () => {
      const response = await request(app).get("/vehicles");
      assert.strictEqual(response.status, 200);
    });
  });

  describe("Read By Id", () => {
    it("It should read a vehicle with a existing id", async () => {
      const response = await request(app).get(
        "/vehicles/e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da"
      );
      assert.strictEqual(response.status, 200);
    });

    it("It should not read a vehicle with a not existing id", async () => {
      const response = await request(app).get("/vehicles/a");
      assert.strictEqual(response.status, 400);
    });
  });

  describe("Update", () => {
    it("It should update an existing vehicle with the correct parameters", async () => {
      const response = await request(app)
        .put("/vehicles/e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da")
        .send({
          placa: "DEF1234",
          chassi: "8qs1yhxs0fq5uq7hs",
          renavam: "1123456789",
          modelo: "Tiggo 8",
          marca: "Caoa Chery",
          ano: 2022,
        });
      assert.strictEqual(response.status, 200);
    });

    it("It should not update an not existing vehicle", async () => {
      const response = await request(app).put("/vehicles/b").send({
        placa: "DEF1234",
        chassi: "8qs1yhxs0fq5uq7hs",
        renavam: "1123456789",
        modelo: "Tiggo 8",
        marca: "Caoa Chery",
        ano: 2022,
      });
      assert.strictEqual(response.status, 400);
    });

    it("It should not update an existing vehicle with placa, chassi or renavam from another vehicle", async () => {
      const response = await request(app)
        .put("/vehicles/fadd3a1d-5828-41d4-b11a-747c789b5a8b")
        .send({
          placa: "DEF1234",
          chassi: "8qs1yhxs0fq5uq7hs",
          renavam: "1123456789",
          modelo: "Tiggo 8",
          marca: "Caoa Chery",
          ano: 2022,
        });
      assert.strictEqual(response.status, 400);
    });
  });

  describe("Delete", () => {
    it("It should delete a existing vehicle", async () => {
      const response = await request(app).delete(
        "/vehicles/e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da"
      );
      // Cleaning database.sqlite
      await request(app).delete(
        "/vehicles/fadd3a1d-5828-41d4-b11a-747c789b5a8b"
      );
      // End
      assert.strictEqual(response.status, 200);
    });

    it("It should not delete a not existing vehicle", async () => {
      const response = await request(app).delete("/vehicles/c");
      assert.strictEqual(response.status, 400);
    });
  });
});
