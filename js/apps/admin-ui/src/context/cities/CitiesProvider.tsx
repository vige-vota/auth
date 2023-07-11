import axios, { AxiosResponse } from "axios";
import environment from "../../environment";
import { useState } from "react";
import { useAdminClient, useFetch } from "../auth/AdminClient";

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
  const url = environment.resourceUrl + "?all";
  const { adminClient } = useAdminClient();
  console.log(adminClient.clients);

  useFetch(
    async () => {
      const listResources = await adminClient.clients.listResources();
      const resource = await adminClient.clients.getResource();
      const resourceServer = await adminClient.clients.getResourceServer();
      return { listResources, resource, resourceServer };
    },
    ({ listResources, resource, resourceServer }) => {
      console.log(listResources);
      console.log(resource);
      console.log(resourceServer);
    },
    []
  );

  const [locations, setLocations] = useState<ZonesRepresentation>({
    zones: [],
  });
  axios.get(url).then((response: AxiosResponse) => {
    setLocations(response.data);
  });
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
