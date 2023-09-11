import { PropsWithChildren } from "react";
import { FieldError, FieldValues, Merge } from "react-hook-form";
export type FormLabelProps<T extends FieldValues = FieldValues> = {
    label?: string;
    name: string;
    labelIcon?: string;
    error?: FieldError | Merge<FieldError, T>;
    isRequired: boolean;
};
export declare const FormLabel: ({ name, label, labelIcon, error, children, ...rest }: PropsWithChildren<FormLabelProps>) => JSX.Element;
