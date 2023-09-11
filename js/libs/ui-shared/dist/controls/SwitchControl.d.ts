import { FieldValues, FieldPath, UseControllerProps } from "react-hook-form";
import { SwitchProps } from "@patternfly/react-core";
export type SwitchControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = SwitchProps & UseControllerProps<T, P> & {
    name: string;
    label?: string;
    labelIcon?: string;
    labelOn: string;
    labelOff: string;
    stringify?: boolean;
};
export declare const SwitchControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>(props: SwitchControlProps<T, P>) => import("react/jsx-runtime").JSX.Element;
