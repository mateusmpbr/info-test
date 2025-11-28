import { describe, it, afterEach } from "mocha";
import assert from "assert";
import { VehicleMapper } from "../../src/infra/mappers/sql-vehicle-mapper";
import { VehicleModel } from "../../src/infra/models/vehicle.model";

describe("VehicleMapper", () => {
  const originalFindOne = (VehicleModel as any).findOne;
  const originalFindAll = (VehicleModel as any).findAll;
  const originalCreate = (VehicleModel as any).create;
  const originalUpdate = (VehicleModel as any).update;
  const originalDestroy = (VehicleModel as any).destroy;

  afterEach(() => {
    (VehicleModel as any).findOne = originalFindOne;
    (VehicleModel as any).findAll = originalFindAll;
    (VehicleModel as any).create = originalCreate;
    (VehicleModel as any).update = originalUpdate;
    (VehicleModel as any).destroy = originalDestroy;
  });

  it("find returns null when not found", async () => {
    (VehicleModel as any).findOne = async () => null;
    const m = new VehicleMapper();
    const out = await m.find("x");
    assert.strictEqual(out, null);
  });

  it("find returns entity when row found", async () => {
    const row = {
      id: "1",
      placa: "ABC1234",
      chassi: "00000000000000000",
      renavam: "0123456789",
      modelo: "Model",
      marca: "Brand",
      ano: 2020,
    };
    (VehicleModel as any).findOne = async () => row;
    const m = new VehicleMapper();
    const out = await m.find("1");
    assert.strictEqual(out?.id, row.id);
    assert.strictEqual(out?.placa, row.placa);
  });

  it("findByUnique returns null when no criteria provided", async () => {
    const m = new VehicleMapper();
    const out = await m.findByUnique({} as any);
    assert.strictEqual(out, null);
  });

  it("findByUnique queries OR conditions and returns entity", async () => {
    const row = {
      id: "2",
      placa: "ZAB1234",
      chassi: "c",
      renavam: "r",
      modelo: "M",
      marca: "B",
      ano: 2019,
    };
    let capturedWhere: any = null;
    (VehicleModel as any).findOne = async (opts: any) => {
      capturedWhere = opts?.where;
      return row;
    };

    const m = new VehicleMapper();
    const out = await m.findByUnique({ placa: "ZAB1234" });
    // ensure we built OR condition
    assert.ok(capturedWhere);
    assert.ok(out?.id === row.id);
  });

  it("findAll returns empty array when none", async () => {
    (VehicleModel as any).findAll = async () => [];
    const m = new VehicleMapper();
    const out = await m.findAll();
    assert.ok(Array.isArray(out));
    assert.strictEqual(out.length, 0);
  });

  it("findAll maps rows to entities", async () => {
    const rows = [
      {
        id: "1",
        placa: "A",
        chassi: "c",
        renavam: "r",
        modelo: "M",
        marca: "B",
        ano: 2000,
      },
    ];
    (VehicleModel as any).findAll = async () => rows;
    const m = new VehicleMapper();
    const out = await m.findAll();
    assert.strictEqual(out.length, 1);
    assert.strictEqual(out[0].id, "1");
  });

  it("create persists and returns entity", async () => {
    const row = {
      id: "3",
      placa: "C",
      chassi: "c",
      renavam: "r",
      modelo: "M",
      marca: "B",
      ano: 2001,
    };
    let capturedPayload: any = null;
    (VehicleModel as any).create = async (p: any) => {
      capturedPayload = p;
      return row;
    };

    const m = new VehicleMapper();
    const vehicle = row as any;
    const out = await m.create(vehicle as any);
    assert.strictEqual(capturedPayload.id, row.id);
    assert.strictEqual(out.id, row.id);
  });

  it("update returns early when no fields provided", async () => {
    let updateCalled = false;
    (VehicleModel as any).update = async () => {
      updateCalled = true;
    };

    const m = new VehicleMapper();
    await m.update({}, "1");
    assert.strictEqual(updateCalled, false);
  });

  it("delete calls destroy with where clause", async () => {
    let capturedWhere: any = null;
    (VehicleModel as any).destroy = async (opts: any) => {
      capturedWhere = opts?.where;
    };

    const m = new VehicleMapper();
    await m.delete("del-id");
    assert.ok(capturedWhere);
    assert.strictEqual(capturedWhere.id, "del-id");
  });
});
