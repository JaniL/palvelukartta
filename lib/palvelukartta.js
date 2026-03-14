"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRetrieveAsync = itemRetrieveAsync;
exports.itemRetrieve = itemRetrieve;
const superagent_1 = __importDefault(require("superagent"));
const DEFAULT_API_VERSION = 4;
const DEFAULT_API_BASE_URL = `https://www.hel.fi/palvelukarttaws/rest/v${DEFAULT_API_VERSION}`;
function normalizeBaseUrl(url) {
    return url.endsWith("/") ? url.slice(0, -1) : url;
}
function getBaseUrl() {
    const fromEnv = process.env.PALVELUKARTTA_API_BASE_URL;
    if (fromEnv && fromEnv.trim().length > 0) {
        return normalizeBaseUrl(fromEnv.trim());
    }
    return DEFAULT_API_BASE_URL;
}
function buildRequest(model, searchParams) {
    let url = `${getBaseUrl()}/${model}/`;
    const query = {};
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            if (value !== undefined && value !== null) {
                query[key] = value;
            }
        }
        const id = query.id;
        if (id !== undefined && id !== null && id !== "") {
            url += `${id}/`;
            delete query.id;
        }
        if (query.accessibility === true) {
            url += "accessibility/";
            delete query.accessibility;
        }
    }
    return { url, query };
}
async function itemRetrieveAsync(model, searchParams) {
    const { url, query } = buildRequest(model, searchParams);
    const response = await superagent_1.default.get(url).query(query).accept("application/json");
    return response.body;
}
/**
 * @deprecated Prefer `itemRetrieveAsync` for new code.
 */
function itemRetrieve(model, searchParams, cb) {
    itemRetrieveAsync(model, searchParams)
        .then((data) => {
        cb(null, data);
    })
        .catch((error) => {
        const err = error instanceof Error ? error : new Error("Request failed");
        cb(err, null);
    });
}
module.exports = {
    itemRetrieve,
    itemRetrieveAsync,
};
