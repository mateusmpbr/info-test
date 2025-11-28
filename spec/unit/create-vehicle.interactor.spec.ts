import { describe, it } from "mocha";
import assert from "assert";
import { CreateVehicleDTO } from "../../src/use-cases/create-vehicle/create-vehicle.dto";
import { execute as createExecute } from "../../src/use-cases/create-vehicle/create-vehicle.interactor";
import { VehicleRepository } from "../../src/use-cases/ports/vehicle.repository";

describe("CreateVehicle interactor", () => {
  it("creates when repository has no conflicts", async () => {
    const payload: CreateVehicleDTO = {
      placa: "ABC1234",
      chassi: "7qs1yhxs0fq5uq7hs",
      renavam: "0123456789",
      modelo: "Tiggo 8",
      marca: "Caoa Chery",
      ano: 2022,
    };

    const repo: VehicleRepository = {
      findById: async () => null,
      findByUnique: async () => null,
      findAll: async () => [],
      create: async (p) => ({ ...(p as any) } as any),
      update: async (id, p) => ({ ...(p as any), id } as any),
      delete: async (id) => {},
    };

    const result = await createExecute(payload, repo);
    assert.strictEqual(typeof result, "string");
    assert.ok(result.length > 0);
  });

  it("throws on duplicate placa", async () => {
    const payload: CreateVehicleDTO = {
      placa: "ABC1234",
      chassi: "7qs1yhxs0fq5uq7hs",
      renavam: "0123456789",
      modelo: "Tiggo 8",
      marca: "Caoa Chery",
      ano: 2022,
    };

    const repo: VehicleRepository = {
      findById: async () => null,
      findByUnique: async () => ({ id: "x" } as any),
      findAll: async () => [],
      create: async (p) => ({ ...(p as any) } as any),
      update: async (id, p) => ({ ...(p as any), id } as any),
      delete: async (id) => {},
    };

    let thrown = false;
    try {
      await createExecute(payload, repo);
    } catch (e: any) {
      thrown = true;
      assert.strictEqual(e.status, 400);
    }
    assert.strictEqual(thrown, true);
  });
});
