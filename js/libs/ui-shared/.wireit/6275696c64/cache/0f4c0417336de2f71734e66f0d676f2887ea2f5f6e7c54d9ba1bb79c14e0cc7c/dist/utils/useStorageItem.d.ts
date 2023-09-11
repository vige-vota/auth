import { Dispatch } from "react";
/**
 * A hook that allows you to get a specific item stored by the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
 * Automatically updates the value when modified in the context of another document (such as an open tab) trough the [`storage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event) event.
 *
 * @param storageArea The storage area to target, must implement the [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface (such as [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)).
 * @param keyName The key of the item to get from storage, same as passed to [`Storage.getItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)
 * @param The default value to fall back to in case no stored value was retrieved.
 */
export declare function useStorageItem(storageArea: Storage, keyName: string, defaultValue: string): [string, Dispatch<string>];
