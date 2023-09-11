import { ReactNode } from "react";
import { ButtonProps, ModalProps } from "@patternfly/react-core";
export type ContinueCancelModalProps = Omit<ModalProps, "ref" | "children"> & {
    modalTitle: string;
    modalMessage?: string;
    buttonTitle: string | ReactNode;
    buttonVariant?: ButtonProps["variant"];
    isDisabled?: boolean;
    onContinue: () => void;
    continueLabel?: string;
    cancelLabel?: string;
    component?: React.ElementType<any> | React.ComponentType<any>;
    children?: ReactNode;
};
export declare const ContinueCancelModal: ({ modalTitle, modalMessage, buttonTitle, isDisabled, buttonVariant, onContinue, continueLabel, cancelLabel, component, children, ...rest }: ContinueCancelModalProps) => import("react/jsx-runtime").JSX.Element;
