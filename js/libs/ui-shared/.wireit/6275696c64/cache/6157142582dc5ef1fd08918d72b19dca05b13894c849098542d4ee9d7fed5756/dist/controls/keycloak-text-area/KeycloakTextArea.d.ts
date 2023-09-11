import { TextArea } from "@patternfly/react-core";
import { ComponentProps, HTMLProps } from "react";
export type KeycloakTextAreaProps = Omit<ComponentProps<typeof TextArea>, "onChange"> & Pick<HTMLProps<HTMLTextAreaElement>, "onChange">;
export declare const KeycloakTextArea: import("react").ForwardRefExoticComponent<Omit<KeycloakTextAreaProps, "ref"> & import("react").RefAttributes<HTMLTextAreaElement>>;
