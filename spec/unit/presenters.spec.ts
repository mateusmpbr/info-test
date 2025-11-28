import { describe, it } from "mocha";
import assert from "assert";
import createPresenter from "../../src/adapters/create-vehicle/create-vehicle.presenter";
import getPresenter from "../../src/adapters/get-vehicle/get-vehicle.presenter";
import listPresenter from "../../src/adapters/get-vehicles/get-vehicles.presenter";
import updatePresenter from "../../src/adapters/update-vehicle/update-vehicle.presenter";

describe("Presenters", () => {
  it("create presenter returns record as-is", () => {
    const id = "1";
    const out = createPresenter.show({ id });
    assert.deepStrictEqual(out, { id });
  });

  it("get presenter returns record as-is", () => {
    const record = {
      id: "1",
      placa: "ABC1234",
      chassi: "00000000000000000",
      renavam: "0123456789",
      modelo: "Model",
      marca: "Brand",
      ano: 2020,
    };
    const out = getPresenter.show(record);
    assert.deepStrictEqual(out, record);
  });

  it("list presenter returns same array", () => {
    const input = {
      vehicles: [
        {
          id: "1",
          placa: "ABC1234",
          chassi: "00000000000000000",
          renavam: "0123456789",
          modelo: "Model",
          marca: "Brand",
          ano: 2020,
        },
      ],
    };
    const out = listPresenter.show(input);
    assert.deepStrictEqual(out, input);
  });

  it("update/delete presenters wrap record", () => {
    const record = { id: "1" };
    assert.strictEqual(updatePresenter.show(record), undefined);
  });
});
