import { TextInput } from "@patternfly/react-core";
import { ComponentProps, HTMLProps } from "react";
export type KeycloakTextInputProps = Omit<ComponentProps<typeof TextInput>, "onChange"> & Pick<HTMLProps<HTMLInputElement>, "onChange">;
export declare const KeycloakTextInput: import("react").ForwardRefExoticComponent<Omit<KeycloakTextInputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
