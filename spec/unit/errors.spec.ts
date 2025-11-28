import { describe, it } from "mocha";
import assert from "assert";
import {
  HttpError,
  BadRequestError,
  NotFoundError,
  ConflictError,
  InvalidIdError,
  VehicleNotFoundError,
} from "../../src/shared/errors";

describe("Shared errors classes", () => {
  it("HttpError carries status and message", () => {
    const e = new HttpError("msg", 418, { info: true });
    assert.strictEqual(e.status, 418);
    assert.strictEqual(e.message, "msg");
    assert.deepStrictEqual(e.details, { info: true });
  });

  it("BadRequestError defaults to 400", () => {
    const e = new BadRequestError();
    assert.strictEqual(e.status, 400);
    assert.strictEqual(e.name, "BadRequestError");
  });

  it("NotFoundError defaults to 404", () => {
    const e = new NotFoundError();
    assert.strictEqual(e.status, 404);
    assert.strictEqual(e.name, "NotFoundError");
  });

  it("ConflictError defaults to 409", () => {
    const e = new ConflictError();
    assert.strictEqual(e.status, 409);
    assert.strictEqual(e.name, "ConflictError");
  });

  it("InvalidIdError is a BadRequestError with specific message", () => {
    const e = new InvalidIdError();
    assert.strictEqual(e.status, 400);
    assert.ok(e.message.includes("UUID v4"));
  });

  it("VehicleNotFoundError is NotFoundError with message", () => {
    const e = new VehicleNotFoundError();
    assert.strictEqual(e.status, 404);
    assert.ok(e.message.toLowerCase().includes("not found"));
  });
});
