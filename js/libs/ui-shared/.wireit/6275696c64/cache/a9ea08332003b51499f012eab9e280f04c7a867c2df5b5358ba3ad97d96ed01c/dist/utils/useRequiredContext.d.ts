import type { Context } from "react";
/**
 * Passes the call to `useContext` and throw an exception if the resolved value is either `null` or `undefined`.
 * Can be used for contexts that are required and should always have a non nullable value.
 *
 * @param context The context to pass to `useContext`
 * @returns
 */
export declare function useRequiredContext<T>(context: Context<T>): NonNullable<T>;
