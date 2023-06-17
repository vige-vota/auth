import axios from "axios";
import type { ServerInfoRepresentation } from "@keycloak/keycloak-admin-client/lib/defs/serverInfoRepesentation";
import { createNamedContext, useRequiredContext } from "ui-shared";

export const CitiesContext = createNamedContext<
  ServerInfoRepresentation | undefined
>("CitiesContext", undefined);

export const useCities = () => useRequiredContext(CitiesContext);

export const getTreeZones = (votingPapers) => {
  const url =
    process.env.REACT_APP_CITIES_GENERATOR_URL + votingPapers + "?all";
  return axios.get(url);
};
