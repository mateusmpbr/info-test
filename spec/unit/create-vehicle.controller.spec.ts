import { describe, it } from "mocha";
import assert from "assert";
import { createRequire } from "module";

const requireC = createRequire(import.meta.url as any);

describe("create-vehicle.controller", () => {
  it("builds input and returns created payload", async () => {
    const useCasePath = requireC.resolve(
      "../../src/use-cases/create-vehicle/create-vehicle.interactor"
    );
    const orig = requireC.cache[useCasePath];

    const mockExecute = async (input: any) => {
      return { id: "mock-id", ...input };
    };

    requireC.cache[useCasePath] = {
      id: useCasePath,
      filename: useCasePath,
      loaded: true,
      exports: mockExecute,
    } as any;

    const { run } = requireC(
      "../../src/adapters/create-vehicle/create-vehicle.controller"
    );

    const req: any = {
      body: {
        placa: "ABC1234",
        chassi: "c",
        renavam: "r",
        modelo: "M",
        marca: "B",
        ano: 2020,
      },
    };
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
    assert.strictEqual(payload.id, "mock-id");
    // presenter returns only id for create, placa intentionally omitted
  });
});
