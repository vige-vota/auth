import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAdminClient, useFetch } from "../auth/AdminClient";
import type { ClientQuery } from "@keycloak/keycloak-admin-client/lib/resources/clients";

export const ID_ZONES = "zones";

export interface ZonesRepresentation {
  zones: ZonesFieldRepresentation[];
}

export interface ZonesFieldRepresentation {
  id: string;
  name: string;
  level: number;
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
  locations: ZonesRepresentation,
  location?: any
): ZonesFieldRepresentation[] => {
  let id = "";
  if (location.value !== "") {
    id = getId(location, 0);
  }
  return locations.zones
    .filter((d) => (location.value !== "" ? d.id === id : true))
    .flatMap((e: ZonesFieldRepresentation) => e.zones);
};

export const level2 = (
  locations: ZonesRepresentation,
  location?: any
): ZonesFieldRepresentation[] => {
  let id = "";
  if (location.value !== "") {
    id = getId(location, 1);
  }
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .filter((d) => (location.value !== "" ? d.id === id : true))
    .flatMap((f: ZonesFieldRepresentation) => f.zones);
};

export const level3 = (
  locations: ZonesRepresentation,
  location?: any
): ZonesFieldRepresentation[] => {
  let id = "";
  if (location.value !== "") {
    id = getId(location, 2);
  }
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .flatMap((f: ZonesFieldRepresentation) => f.zones)
    .filter((d) => (location.value !== "" ? d.id === id : true))
    .flatMap((g) => g.zones);
};

export const getId = (field: any, level: number): string => {
  let result = "";
  let id = "";
  if (field.value !== undefined && field.value !== "")
    id = field.value[1].value;
  switch (level) {
    case 0:
      result = id.split("-")[0];
      break;
    case 1:
      result = id.split("-")[0] + "-" + id.split("-")[1];
      break;
    case 2:
      result =
        id.split("-")[0] + "-" + id.split("-")[1] + "-" + id.split("-")[2];
      break;
    case 3:
      result =
        id.split("-")[0] +
        "-" +
        id.split("-")[1] +
        "-" +
        id.split("-")[2] +
        "-" +
        id.split("-")[3];
      break;
  }
  return result;
};

export const getDescription = (
  locations: ZonesFieldRepresentation[],
  field: string
): string => {
  let description = "";
  if (locations.length > 0) {
    const locs = locations.filter((location) => location.id === field);
    if (locs.length > 0) {
      const loc = locs[0];
      description = loc.name;
    }
  }
  return description;
};
