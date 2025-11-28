import { describe, it } from "mocha";
import assert from "assert";
import { execute as getVehiclesExecute } from "../../src/use-cases/get-vehicles/get-vehicles.interactor";
import { VehicleRepository } from "../../src/use-cases/ports/vehicle.repository";

describe("GetVehicles interactor", () => {
  it("returns records from repository", async () => {
    const repo: VehicleRepository = {
      findById: async () => null,
      findByUnique: async () => null,
      findAll: async () => [{ id: "1", placa: "A" } as any],
      create: async () => ({} as any),
      update: async () => ({} as any),
      delete: async () => {},
    };

    const records = await getVehiclesExecute(repo);
    assert.ok(Array.isArray(records));
    assert.strictEqual(records.length, 1);
  });
});
