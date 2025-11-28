import { describe, it } from "mocha";
import assert from "assert";
import { execute as updateExecute } from "../../src/use-cases/update-vehicle/update-vehicle.interactor";
import { UpdateVehicleDTO } from "../../src/use-cases/update-vehicle/update-vehicle.dto";
import { VehicleRepository } from "../../src/use-cases/ports/vehicle.repository.dto";

describe("UpdateVehicle interactor", () => {
  it("updates when record exists and no uniqueness conflicts", async () => {
    const id = "e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da";
    const payload: UpdateVehicleDTO = { placa: "NEW1234" };

    const repo: VehicleRepository = {
      findById: async (i) => ({ id: i, placa: "OLD" } as any),
      findByUnique: async () => null,
      findAll: async () => [],
      create: async () => ({} as any),
      update: async (i, p) => ({ id: i, ...(p as any) } as any),
      delete: async () => {},
    };

    const updated = await updateExecute(id, payload, repo);
    assert.strictEqual(updated.placa, payload.placa);
    assert.strictEqual(updated.id, id);
  });

  it("returns null when record does not exist", async () => {
    const id = "fadd3a1d-5828-41d4-b11a-747c789b5a8b";
    const payload: UpdateVehicleDTO = { placa: "NEW1234" };

    const repo: VehicleRepository = {
      findById: async () => null,
      findByUnique: async () => null,
      findAll: async () => [],
      create: async () => ({} as any),
      update: async () => ({} as any),
      delete: async () => {},
    };

    const result = await updateExecute(id, payload, repo);
    assert.strictEqual(result, null);
  });

  it("throws on placa conflict", async () => {
    const id = "existing-id";
    const payload: UpdateVehicleDTO = { placa: "CONFLICT" };

    const repo: VehicleRepository = {
      findById: async (i) => ({ id: i, placa: "OLD" } as any),
      findByUnique: async () => ({ id: "other" } as any),
      findAll: async () => [],
      create: async () => ({} as any),
      update: async () => ({} as any),
      delete: async () => {},
    };

    let thrown = false;
    try {
      await updateExecute(id, payload, repo);
    } catch (e: any) {
      thrown = true;
      assert.strictEqual(e.status, 400);
    }
    assert.strictEqual(thrown, true);
  });
});
