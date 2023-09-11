/// <reference types="react" />
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
export type TextAreaControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = UseControllerProps<T, P> & {
    label: string;
    labelIcon?: string;
    isDisabled?: boolean;
};
export declare const TextAreaControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>(props: TextAreaControlProps<T, P>) => JSX.Element;
