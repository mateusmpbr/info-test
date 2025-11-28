import { describe, it } from "mocha";
import assert from "assert";
import { Vehicle } from "../../src/entities/Vehicle.entity";

describe("Vehicle entity", () => {
  it("builds and exposes props via getters", () => {
    const props = {
      id: "1",
      placa: "ABC1234",
      chassi: "00000000000000000",
      renavam: "0123456789",
      modelo: "Model",
      marca: "Brand",
      ano: 2020,
    };

    const v = Vehicle.build(props);
    assert.strictEqual(v.id, props.id);
    assert.strictEqual(v.placa, props.placa);
    assert.strictEqual(v.chassi, props.chassi);
    assert.strictEqual(v.renavam, props.renavam);
    assert.strictEqual(v.modelo, props.modelo);
    assert.strictEqual(v.marca, props.marca);
    assert.strictEqual(v.ano, props.ano);
    assert.deepStrictEqual(v.getProps(), props);
  });
});
