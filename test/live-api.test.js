"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const pk = require("../lib/palvelukartta.js");

const shouldRunLiveTests = process.env.LIVE_API_TESTS === "1";

test("live api smoke test", { skip: !shouldRunLiveTests }, async () => {
  const response = await pk.itemRetrieveAsync("arealcity", null);

  assert.ok(Array.isArray(response));
  assert.ok(response.length > 0);
});
