import { PropsWithChildren } from "react";
type HelpContextProps = {
    enabled: boolean;
    toggleHelp: () => void;
};
export declare const HelpContext: import("../utils/createNamedContext").NamedContext<HelpContextProps | undefined>;
export declare const useHelp: () => HelpContextProps;
export declare const Help: ({ children }: PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
export {};
