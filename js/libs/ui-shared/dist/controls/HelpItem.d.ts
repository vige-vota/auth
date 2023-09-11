import { ReactNode } from "react";
type HelpItemProps = {
    helpText: string | ReactNode;
    fieldLabelId: string;
    noVerticalAlign?: boolean;
    unWrap?: boolean;
};
export declare const HelpItem: ({ helpText, fieldLabelId, noVerticalAlign, unWrap, }: HelpItemProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
