import { it, expect } from "vitest";
import { stringToUUIDFormat } from "./utils";

it("", () => {
  const text = "0000000014_554760c5-e0db-416d-bb46-51d8a27b0980";

  expect(stringToUUIDFormat(text)).toMatchInlineSnapshot(
    '"aea24aa0-4275-5548-be92-1e6083253543"'
  );
});
