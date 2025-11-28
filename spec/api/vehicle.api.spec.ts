import { app } from "../../src/index";
import request from "supertest";
import assert from "assert";

const vehicleA = {
  placa: "ABC1234",
  chassi: "7qs1yhxs0fq5uq7hs",
  renavam: "0123456789",
  modelo: "Tiggo 8",
  marca: "Caoa Chery",
  ano: 2022,
};

const vehicleB = {
  placa: "ZAB1234",
  chassi: "6qs1yhxs0fq5uq7hs",
  renavam: "9123456789",
  modelo: "Corolla XEi",
  marca: "Toyota",
  ano: 2020,
};

describe("Vehicles (integration)", () => {
  let VEHICLE_A: string;
  let VEHICLE_B: string;

  // create fixtures before tests
  before(async () => {
    VEHICLE_A = (await request(app).post("/vehicles").send(vehicleA)).body.id;
    VEHICLE_B = (await request(app).post("/vehicles").send(vehicleB)).body.id;
  });

  // clean up fixtures afterwards
  after(async () => {
    await request(app).delete(`/vehicles/${VEHICLE_A}`);
    await request(app).delete(`/vehicles/${VEHICLE_B}`);
  });

  describe("Create", () => {
    it("creates a vehicle and returns it", async () => {
      const payload = {
        placa: "NEW1234",
        chassi: "9qs1yhxs0fq5uq7hs",
        renavam: "11122233344",
        modelo: "Civic",
        marca: "Honda",
        ano: 2021,
      };

      const res = await request(app).post("/vehicles").send(payload);
      assert.strictEqual(res.status, 200);
      // response body should include the created id and fields
      assert.strictEqual(res.body.placa, payload.placa);

      // cleanup created record
      await request(app).delete(`/vehicles/${res.body.id}`);
    });

    it("returns 400 for missing required fields", async () => {
      const res = await request(app).post("/vehicles").send({ renavam: "1" });
      assert.strictEqual(res.status, 400);
    });

    it("returns 400 when attempting to create duplicate unique fields", async () => {
      // attempt to create another record with the same placa/chassi/renavam as vehicleB
      const res = await request(app)
        .post("/vehicles")
        .send({ ...vehicleB });
      assert.strictEqual(res.status, 400);
    });
  });

  describe("Read", () => {
    it("lists vehicles and includes fixtures", async () => {
      const res = await request(app).get("/vehicles");
      assert.strictEqual(res.status, 200);
      const ids = (res.body || []).map((r: any) => r.id);
      assert.ok(ids.includes(VEHICLE_A));
      assert.ok(ids.includes(VEHICLE_B));
    });
  });

  describe("Read By Id", () => {
    it("returns a vehicle by id", async () => {
      const res = await request(app).get(`/vehicles/${VEHICLE_A}`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.id, VEHICLE_A);
    });

    it("returns 400 for invalid id format", async () => {
      const res = await request(app).get("/vehicles/invalid-id");
      assert.strictEqual(res.status, 400);
    });
  });

  describe("Update", () => {
    it("updates an existing vehicle", async () => {
      const res = await request(app)
        .put(`/vehicles/${VEHICLE_A}`)
        .send({ placa: "UPD1234", modelo: "Tiggo X" });
      assert.strictEqual(res.status, 200);
      // update presenter wraps result under `record`
      assert.strictEqual(res.body.record.placa, "UPD1234");
    });

    it("returns 400 when updating non-existent vehicle", async () => {
      const res = await request(app)
        .put("/vehicles/00000000-0000-0000-0000-000000000000")
        .send({ placa: "X" });
      assert.strictEqual(res.status, 400);
    });

    it("returns 400 when update would cause uniqueness conflict", async () => {
      // try to update VEHICLE_A to have same placa as VEHICLE_B
      const res = await request(app)
        .put(`/vehicles/${VEHICLE_A}`)
        .send({ placa: vehicleB.placa });
      assert.strictEqual(res.status, 400);
    });
  });

  describe("Delete", () => {
    it("deletes an existing vehicle and returns payload", async () => {
      // create a temporary vehicle to delete (valid UUID v4)
      const tmpId = (
        await request(app).post("/vehicles").send({
          placa: "DEL1234",
          chassi: "0qs1yhxs0fq5uq7hs",
          renavam: "77788899900",
          modelo: "Ka",
          marca: "Ford",
          ano: 2019,
        })
      ).body.id;

      const res = await request(app).delete(`/vehicles/${tmpId}`);
      assert.strictEqual(res.status, 200);
      // delete presenter returns { record }
      assert.strictEqual(res.body.record.id, tmpId);
    });

    it("returns 400 when deleting non-existent vehicle", async () => {
      const res = await request(app).delete(
        "/vehicles/00000000-0000-0000-0000-000000000000"
      );
      assert.strictEqual(res.status, 400);
    });
  });
});
