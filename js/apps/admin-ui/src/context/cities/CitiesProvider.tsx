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

export const level0 = (
  locations: ZonesRepresentation
): ZonesFieldRepresentation[] => {
  return locations.zones;
};

export const level1 = (
  locations: ZonesRepresentation
): ZonesFieldRepresentation[] => {
  return locations.zones.flatMap((e: ZonesFieldRepresentation) => e.zones);
};

export const level2 = (
  locations: ZonesRepresentation
): ZonesFieldRepresentation[] => {
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .flatMap((f: ZonesFieldRepresentation) => f.zones);
};

export const level3 = (
  locations: ZonesRepresentation
): ZonesFieldRepresentation[] => {
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .flatMap((f: ZonesFieldRepresentation) => f.zones)
    .flatMap((g) => g.zones);
};

export const level0value = (
  location: string,
  locations: ZonesRepresentation
): string => {
  const id = location.split("-")[0];
  let level: string = "";
  level0(locations).forEach((location) => {
    if (location.id === id && location.name !== undefined)
      level = location.name;
  });
  return level;
};

export const level1value = (
  location: string,
  locations: ZonesRepresentation
): string => {
  const splittedLocation = location.split("-");
  const id = splittedLocation[0] + "-" + splittedLocation[1];
  let level: string = "";
  level1(locations).forEach((location) => {
    if (location.id === id && location.name !== undefined)
      level = location.name;
  });
  return level;
};

export const level2value = (
  location: string,
  locations: ZonesRepresentation
): string => {
  const splittedLocation = location.split("-");
  const id =
    splittedLocation[0] + "-" + splittedLocation[1] + "-" + splittedLocation[2];
  let level: string = "";
  level2(locations).forEach((location) => {
    if (location.id === id && location.name !== undefined)
      level = location.name;
  });
  return level;
};

export const level3value = (
  location: string,
  locations: ZonesRepresentation
): string => {
  const id = location;
  let level: string = "";
  level3(locations).forEach((location) => {
    if (location.id === id && location.name !== undefined)
      level = location.name;
  });
  return level;
};
