import { describe, it } from "mocha";
import assert from "assert";
import { execute as getVehicleExecute } from "../../src/use-cases/get-vehicle/get-vehicle.interactor";
import { VehicleRepository } from "../../src/use-cases/ports/vehicle.repository";

describe("GetVehicle interactor", () => {
  it("returns a record when found", async () => {
    const repo: VehicleRepository = {
      findById: async (id: string) => ({ id, placa: "X" } as any),
      findByUnique: async () => null,
      findAll: async () => [],
      create: async () => ({} as any),
      update: async () => ({} as any),
      delete: async () => {},
    };

    const rec = await getVehicleExecute(
      "e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da",
      repo
    );
    assert.strictEqual(rec.id, "e3988b64-ffc6-4cf5-8d0e-588f0fc3c8da");
  });

  it("throws on invalid id", async () => {
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
      await getVehicleExecute("bad-id", repo as any);
    } catch (e: any) {
      thrown = true;
      assert.strictEqual(e.status, 400);
    }
    assert.strictEqual(thrown, true);
  });
});
