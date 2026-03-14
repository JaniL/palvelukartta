"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const nock = require("nock");

process.env.PALVELUKARTTA_API_BASE_URL = "https://example.test/palvelukarttaws/rest/v4";

const pk = require("../lib/palvelukartta.js");

test.after(() => {
  nock.cleanAll();
  nock.enableNetConnect();
  delete process.env.PALVELUKARTTA_API_BASE_URL;
});

test.beforeEach(() => {
  nock.disableNetConnect();
  nock.cleanAll();
});

test("itemRetrieve returns collection data", async () => {
  nock("https://example.test")
    .get("/palvelukarttaws/rest/v4/organization/")
    .query({ language: "en" })
    .reply(200, [{ id: "org-1" }]);

  const result = await new Promise((resolve, reject) => {
    pk.itemRetrieve("organization", { language: "en" }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });

  assert.deepEqual(result, [{ id: "org-1" }]);
});

test("itemRetrieve builds id and accessibility path segments", async () => {
  nock("https://example.test")
    .get("/palvelukarttaws/rest/v4/unit/31/accessibility/")
    .query({ lang: "en" })
    .reply(200, { unit_id: 31 });

  const response = await new Promise((resolve, reject) => {
    pk.itemRetrieve("unit", { id: 31, accessibility: true, lang: "en" }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });

  assert.deepEqual(response, { unit_id: 31 });
});

test("itemRetrieve does not mutate caller searchParams", async () => {
  nock("https://example.test")
    .get("/palvelukarttaws/rest/v4/organization/91/")
    .query({ language: "en" })
    .reply(200, { id: 91 });

  const params = { id: 91, language: "en" };

  await new Promise((resolve, reject) => {
    pk.itemRetrieve("organization", params, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(undefined);
    });
  });

  assert.deepEqual(params, { id: 91, language: "en" });
});

test("itemRetrieve passes errors to callback", async () => {
  nock("https://example.test").get("/palvelukarttaws/rest/v4/unit/").query(true).replyWithError("Network down");

  const result = await new Promise((resolve) => {
    pk.itemRetrieve("unit", null, (err, data) => {
      resolve({ err, data });
    });
  });

  assert.equal(result.data, null);
  assert.ok(result.err instanceof Error);
  assert.match(result.err.message, /Network down|Request failed/);
});

test("itemRetrieveAsync resolves payload", async () => {
  nock("https://example.test")
    .get("/palvelukarttaws/rest/v4/arealcity/")
    .query({ page: 1 })
    .reply(200, [{ areal_city_id: 91 }]);

  const result = await pk.itemRetrieveAsync("arealcity", { page: 1 });

  assert.deepEqual(result, [{ areal_city_id: 91 }]);
});
