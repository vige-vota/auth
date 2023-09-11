/// <reference types="react" />
import { ControllerProps, FieldValues, FieldPath, UseControllerProps } from "react-hook-form";
import { SelectProps } from "@patternfly/react-core";
type Option = {
    key: string;
    value: string;
};
export type SelectControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = Omit<SelectProps, "name" | "onToggle" | "selections" | "onSelect" | "onClear" | "isOpen"> & UseControllerProps<T, P> & {
    name: string;
    label?: string;
    options: string[] | Option[];
    controller: Omit<ControllerProps, "name" | "render">;
};
export declare const SelectControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>({ name, label, options, controller, ...rest }: SelectControlProps<T, P>) => JSX.Element;
export {};
