import { describe, it } from "mocha";
import assert from "assert";
import { executeRule } from "../../src/infra/server/routes/vehicle.route";

describe("vehicle.route executeRule", () => {
  it("calls next with error when controller module missing", (done) => {
    const handler = executeRule("nonExistentControllerName");

    const req: any = {};
    const res: any = {};
    const next = (err?: any) => {
      try {
        assert.ok(err instanceof Error);
        done();
      } catch (e) {
        done(e);
      }
    };

    handler(req, res, next);
  });
});
