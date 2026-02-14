import { describe, expect, it } from "vitest";

import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  it("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  it("returns null when scheme is not ApiKey", () => {
    expect(getAPIKey({ authorization: "Bearer abc123" })).toBeNull();
  });

  it("returns null when ApiKey header is missing a token", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  it("returns the api key when ApiKey header is valid", () => {
    expect(getAPIKey({ authorization: "ApiKey abc123" })).toBe("abc123");
  });

  it("returns the second segment when extra segments are present", () => {
    expect(getAPIKey({ authorization: "ApiKey abc123 extra" })).toBe("abc123");
  });
});
