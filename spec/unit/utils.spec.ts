import { describe, it } from "mocha";
import assert from "assert";
import { toKebabCase } from "../../src/shared/utils";

describe("toKebabCase util", () => {
  const cases: Array<[string, string]> = [
    ["createVehicle", "create-vehicle"],
    ["getVehicles", "get-vehicles"],
    ["version2Alpha", "version2-alpha"],
    ["MyHTTPServer", "my-http-server"],
    ["JSONResponse", "json-response"],
  ];

  cases.forEach(([input, expected]) => {
    it(`${input} => ${expected}`, () => {
      assert.strictEqual(toKebabCase(input), expected);
    });
  });
});
