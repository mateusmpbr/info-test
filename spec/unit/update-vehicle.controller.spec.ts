import { describe, it } from "mocha";
import assert from "assert";
import { createRequire } from "module";

const requireC = createRequire(import.meta.url as any);

describe("update-vehicle.controller", () => {
  it("calls use-case and returns 200", async () => {
    const useCasePath = requireC.resolve(
      "../../src/use-cases/update-vehicle/update-vehicle.interactor"
    );
    const orig = requireC.cache[useCasePath];

    const mockExecute = async () => undefined;

    requireC.cache[useCasePath] = {
      id: useCasePath,
      filename: useCasePath,
      loaded: true,
      exports: mockExecute,
    } as any;

    const { run } = requireC(
      "../../src/adapters/update-vehicle/update-vehicle.controller"
    );

    const req: any = { params: { id: "id-1" }, body: { placa: "NEW" } };
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
    assert.strictEqual(payload, undefined);
  });
});
