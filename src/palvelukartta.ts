import request from "superagent";

const DEFAULT_API_VERSION = 4;
const DEFAULT_API_BASE_URL = `https://www.hel.fi/palvelukarttaws/rest/v${DEFAULT_API_VERSION}`;

type Primitive = string | number | boolean;
type SearchParams = Record<string, Primitive | null | undefined> | null | undefined;

export type ItemRetrieveCallback<T = unknown> = (err: Error | null, data: T | null) => void;

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function getBaseUrl(): string {
  const fromEnv = process.env.PALVELUKARTTA_API_BASE_URL;
  if (fromEnv && fromEnv.trim().length > 0) {
    return normalizeBaseUrl(fromEnv.trim());
  }

  return DEFAULT_API_BASE_URL;
}

function buildRequest(model: string, searchParams: SearchParams): { url: string; query: Record<string, Primitive> } {
  let url = `${getBaseUrl()}/${model}/`;
  const query: Record<string, Primitive> = {};

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

export async function itemRetrieveAsync<T = unknown>(model: string, searchParams: SearchParams): Promise<T> {
  const { url, query } = buildRequest(model, searchParams);

  const response = await request.get(url).query(query).accept("application/json");
  return response.body as T;
}

/**
 * @deprecated Prefer `itemRetrieveAsync` for new code.
 */
export function itemRetrieve<T = unknown>(
  model: string,
  searchParams: SearchParams,
  cb: ItemRetrieveCallback<T>
): void {
  itemRetrieveAsync<T>(model, searchParams)
    .then((data) => {
      cb(null, data);
    })
    .catch((error: unknown) => {
      const err = error instanceof Error ? error : new Error("Request failed");
      cb(err, null);
    });
}

module.exports = {
  itemRetrieve,
  itemRetrieveAsync,
};
