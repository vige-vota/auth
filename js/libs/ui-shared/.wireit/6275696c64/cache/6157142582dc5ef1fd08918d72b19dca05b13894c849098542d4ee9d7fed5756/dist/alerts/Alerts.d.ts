import { AlertVariant } from "@patternfly/react-core";
import { PropsWithChildren } from "react";
export type AddAlertFunction = (message: string, variant?: AlertVariant, description?: string) => void;
export type AddErrorFunction = (message: string) => void;
export type AlertProps = {
    addAlert: AddAlertFunction;
    addError: AddErrorFunction;
};
export declare const AlertContext: import("react").Context<AlertProps | undefined>;
export declare const useAlerts: () => AlertProps;
export type AlertType = {
    id: number;
    message: string;
    variant: AlertVariant;
    description?: string;
};
export declare const AlertProvider: ({ children }: PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
