import { describe, it } from "mocha";
import assert from "assert";
import { createRequire } from "module";

const requireC = createRequire(import.meta.url as any);

describe("get-vehicle.controller", () => {
  it("calls use-case with params and returns payload", async () => {
    const useCasePath = requireC.resolve(
      "../../src/use-cases/get-vehicle/get-vehicle.interactor"
    );
    const orig = requireC.cache[useCasePath];

    const mockExecute = async (input: any) => {
      return { id: input.id, placa: "X" };
    };

    requireC.cache[useCasePath] = {
      id: useCasePath,
      filename: useCasePath,
      loaded: true,
      exports: mockExecute,
    } as any;

    const { run } = requireC(
      "../../src/adapters/get-vehicle/get-vehicle.controller"
    );

    const req: any = { params: { id: "the-id" } };
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
    assert.strictEqual(payload.id, "the-id");
  });
});
