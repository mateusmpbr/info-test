import { describe, it } from "mocha";
import assert from "assert";
import { execute as updateExecute } from "../../src/use-cases/update-vehicle/update-vehicle.interactor";
import { UpdateVehicleInputDTO } from "../../src/use-cases/update-vehicle/update-vehicle.dto";
import { VehicleRepository } from "../../src/use-cases/ports/vehicle.repository.dto";

describe("UpdateVehicle interactor", () => {
  it("updates when record exists and no uniqueness conflicts", async () => {
    const id = "e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da";
    const payload = { placa: "NEW1234" };

    const repo: VehicleRepository = {
      findById: async (i) => ({ id: i, placa: "OLD" } as any),
      findByUnique: async () => null,
      findAll: async () => [],
      create: async () => ({} as any),
      update: async (i, p) => ({ id: i, ...(p as any) } as any),
      delete: async () => {},
    };

    const input: UpdateVehicleInputDTO = {
      id,
      ...payload,
    } as UpdateVehicleInputDTO;
    const result = await updateExecute(input, repo);
    assert.strictEqual(result, undefined);
  });

  it("returns null when record does not exist", async () => {
    const id = "fadd3a1d-5828-41d4-b11a-747c789b5a8b";
    const payload = { placa: "NEW1234" };

    const repo: VehicleRepository = {
      findById: async () => null,
      findByUnique: async () => null,
      findAll: async () => [],
      create: async () => ({} as any),
      update: async () => ({} as any),
      delete: async () => {},
    };

    let thrown = false;
    try {
      const input: UpdateVehicleInputDTO = {
        id,
        ...payload,
      } as UpdateVehicleInputDTO;
      await updateExecute(input, repo);
    } catch (e: any) {
      thrown = true;
      assert.strictEqual(e.status, 400);
    }
    assert.strictEqual(thrown, true);
  });

  it("throws on placa conflict", async () => {
    const id = "existing-id";
    const payload = { placa: "CONFLICT" };

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
      const input: UpdateVehicleInputDTO = {
        id,
        ...payload,
      } as UpdateVehicleInputDTO;
      await updateExecute(input, repo);
    } catch (e: any) {
      thrown = true;
      assert.strictEqual(e.status, 400);
    }
    assert.strictEqual(thrown, true);
  });
});
