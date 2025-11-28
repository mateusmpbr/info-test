import { describe, it } from "mocha";
import assert from "assert";
import { createRequire } from "module";

const requireC = createRequire(import.meta.url as any);

describe("get-vehicles.controller", () => {
  it("returns list from use-case output via presenter", async () => {
    const useCasePath = requireC.resolve(
      "../../src/use-cases/get-vehicles/get-vehicles.interactor"
    );
    const orig = requireC.cache[useCasePath];

    const mockExecute = async () => ({ vehicles: [{ id: "1" }] });

    requireC.cache[useCasePath] = {
      id: useCasePath,
      filename: useCasePath,
      loaded: true,
      exports: mockExecute,
    } as any;

    const { run } = requireC(
      "../../src/adapters/get-vehicles/get-vehicles.controller"
    );

    const req: any = {};
    let status: number | undefined;
    let payload: any;
    const res: any = {
      status: (s: number) => ({
        json: (p: any) => {
          status = s;
          payload = p;
        },
      }),
    };

    await run(req, res);

    if (orig) requireC.cache[useCasePath] = orig;

    assert.strictEqual(status, 200);
    assert.ok(Array.isArray(payload.vehicles));
    assert.strictEqual(payload.vehicles[0].id, "1");
  });
});
