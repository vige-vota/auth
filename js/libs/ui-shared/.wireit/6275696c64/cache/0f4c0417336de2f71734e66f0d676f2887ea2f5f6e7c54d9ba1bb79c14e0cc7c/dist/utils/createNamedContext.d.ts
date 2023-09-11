import type { Context } from "react";
export type NamedContext<T> = Context<T> & Required<Pick<Context<T>, "displayName">>;
export declare function createNamedContext<T>(displayName: string, defaultValue: T): NamedContext<T>;
