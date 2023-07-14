import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAdminClient, useFetch } from "../auth/AdminClient";
import type { ClientQuery } from "@keycloak/keycloak-admin-client/lib/resources/clients";

export interface ZonesRepresentation {
  zones: ZonesFieldRepresentation[];
}

export interface ZonesFieldRepresentation {
  id?: string;
  name?: string;
  level?: number;
  zones: ZonesFieldRepresentation[];
}

export const initLocations = () => {
  const { adminClient } = useAdminClient();
  const [locations, setLocations] = useState<ZonesRepresentation>({
    zones: [],
  });

  useFetch(
    () => {
      const params: ClientQuery = {
        max: 20,
      };
      params.clientId = "citiesGenerator";
      params.search = true;
      return adminClient.clients.find(params);
    },
    (clients) => {
      const rootUrl = clients[0].rootUrl;
      const url = rootUrl + "/cities?all";
      axios.get(url).then((response: AxiosResponse) => {
        setLocations(response.data);
      });
    },
    []
  );

  return locations;
};

export const level0 = (locations: ZonesRepresentation) => {
  return locations.zones;
};

export const level1 = (locations: ZonesRepresentation) => {
  return locations.zones.flatMap((e: ZonesFieldRepresentation) => e.zones);
};

export const level2 = (locations: ZonesRepresentation) => {
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .flatMap((f: ZonesFieldRepresentation) => f.zones);
};

export const level3 = (locations: ZonesRepresentation) => {
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .flatMap((f: ZonesFieldRepresentation) => f.zones)
    .flatMap((g) => g.zones);
};
