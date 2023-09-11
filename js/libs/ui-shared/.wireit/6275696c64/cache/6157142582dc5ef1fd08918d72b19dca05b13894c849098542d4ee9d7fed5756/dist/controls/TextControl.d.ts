import { TextInputProps } from "@patternfly/react-core";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
export type TextControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = UseControllerProps<T, P> & TextInputProps & {
    label: string;
    labelIcon?: string;
    isDisabled?: boolean;
};
export declare const TextControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>(props: TextControlProps<T, P>) => import("react/jsx-runtime").JSX.Element;
