import { describe, it } from "mocha";
import assert from "assert";
import { execute as deleteExecute } from "../../src/use-cases/delete-vehicle/delete-vehicle.interactor";
import { VehicleRepository } from "../../src/use-cases/ports/vehicle.repository";

describe("DeleteVehicle interactor", () => {
  it("deletes and returns payload when found", async () => {
    const id = "e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da";
    const repo: VehicleRepository = {
      findById: async (i) => ({ id: i, placa: "A" } as any),
      findByPlaca: async () => null,
      findByChassi: async () => null,
      findByRenavam: async () => null,
      findAll: async () => [],
      create: async () => ({} as any),
      update: async () => ({} as any),
      delete: async (i) => {},
    };

    const payload = await deleteExecute(id, repo);
    assert.strictEqual(payload.id, id);
  });

  it("returns null when record not found", async () => {
    const id = "fadd3a1d-5828-41d4-b11a-747c789b5a8b";
    const repo: VehicleRepository = {
      findById: async () => null,
      findByPlaca: async () => null,
      findByChassi: async () => null,
      findByRenavam: async () => null,
      findAll: async () => [],
      create: async () => ({} as any),
      update: async () => ({} as any),
      delete: async () => {},
    };

    const result = await deleteExecute(id, repo);
    assert.strictEqual(result, null);
  });
});
