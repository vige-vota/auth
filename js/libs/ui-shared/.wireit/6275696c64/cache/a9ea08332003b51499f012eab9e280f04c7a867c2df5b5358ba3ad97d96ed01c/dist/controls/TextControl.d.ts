/// <reference types="react" />
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
export type TextControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = UseControllerProps<T, P> & {
    label: string;
    labelIcon?: string;
    isDisabled?: boolean;
};
export declare const TextControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>(props: TextControlProps<T, P>) => JSX.Element;
