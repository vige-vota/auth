import type { ServerInfoRepresentation } from "@keycloak/keycloak-admin-client/lib/defs/serverInfoRepesentation";
import { PropsWithChildren, useState } from "react";

import { sortProviders } from "../../util";
import { createNamedContext, useRequiredContext } from "ui-shared";
import { useAdminClient, useFetch } from "../auth/AdminClient";

export const CitiesContext = createNamedContext<
  ServerInfoRepresentation | undefined
>("CitiesContext", undefined);

export const useCities = () => useRequiredContext(CitiesContext);

export const useLoginProviders = () =>
  sortProviders(useCities().providers!["login-protocol"].providers);

export const ServerInfoProvider = ({ children }: PropsWithChildren) => {
  const { adminClient } = useAdminClient();
  const [serverInfo, setServerInfo] = useState<ServerInfoRepresentation>({});

  useFetch(adminClient.serverInfo.find, setServerInfo, []);

  return (
    <CitiesContext.Provider value={serverInfo}>
      {children}
    </CitiesContext.Provider>
  );
};
