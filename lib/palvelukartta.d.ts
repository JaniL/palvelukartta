type Primitive = string | number | boolean;
type SearchParams = Record<string, Primitive | null | undefined> | null | undefined;
export type ItemRetrieveCallback<T = unknown> = (err: Error | null, data: T | null) => void;
export declare function itemRetrieveAsync<T = unknown>(model: string, searchParams: SearchParams): Promise<T>;
/**
 * @deprecated Prefer `itemRetrieveAsync` for new code.
 */
export declare function itemRetrieve<T = unknown>(model: string, searchParams: SearchParams, cb: ItemRetrieveCallback<T>): void;
export {};
