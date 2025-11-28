import { describe, it } from "mocha";
import assert from "assert";
import presenter from "../../src/adapters/presenters/error.presenter";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../../src/shared/errors";

describe("Error presenter", () => {
  it("maps BadRequestError to validation_error code", () => {
    const err = new BadRequestError("oops", { field: "x" });
    const out = presenter.show(err);
    assert.strictEqual(out.errors.code, "validation_error");
    assert.strictEqual(out.errors.name, "BadRequestError");
    assert.strictEqual(out.errors.details?.field, "x");
  });

  it("maps NotFoundError to not_found code", () => {
    const err = new NotFoundError("not here");
    const out = presenter.show(err);
    assert.strictEqual(out.errors.code, "not_found");
    assert.strictEqual(out.errors.name, "NotFoundError");
  });

  it("maps ConflictError to conflict code", () => {
    const err = new ConflictError("conflict");
    const out = presenter.show(err);
    assert.strictEqual(out.errors.code, "conflict");
    assert.strictEqual(out.errors.name, "ConflictError");
  });

  it("maps generic Error to fallback code", () => {
    const err = new Error("boom");
    const out = presenter.show(err);
    assert.strictEqual(out.errors.code, "error");
    assert.strictEqual(out.errors.name, "Error");
    assert.strictEqual(out.errors.message, "boom");
  });
});
