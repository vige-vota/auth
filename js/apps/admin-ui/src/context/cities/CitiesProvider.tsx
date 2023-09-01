import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAdminClient, useFetch } from "../auth/AdminClient";
import type { ClientQuery } from "@keycloak/keycloak-admin-client/lib/resources/clients";

export const ID_ZONES = "zones---";
let fieldAttributes: any;

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
  locations: ZonesRepresentation,
  location?: ZonesFieldRepresentation
): ZonesFieldRepresentation[] => {
  return locations.zones
    .filter((d) => (location !== undefined ? d === location : true))
    .flatMap((e: ZonesFieldRepresentation) => e.zones);
};

export const level2 = (
  locations: ZonesRepresentation,
  location?: ZonesFieldRepresentation
): ZonesFieldRepresentation[] => {
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .filter((d) => (location !== undefined ? d === location : true))
    .flatMap((f: ZonesFieldRepresentation) => f.zones);
};

export const level3 = (
  locations: ZonesRepresentation,
  location?: ZonesFieldRepresentation
): ZonesFieldRepresentation[] => {
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .flatMap((f: ZonesFieldRepresentation) => f.zones)
    .filter((d) => (location !== undefined ? d === location : true))
    .flatMap((g) => g.zones);
};

export const level0value = (
  location: any,
  locations: ZonesRepresentation
): ZonesFieldRepresentation => {
  let locValue = location.value;
  let level: ZonesFieldRepresentation = locValue;
  let id: string | undefined = "";
  if (Array.isArray(locValue)) {
    fieldAttributes = location;
    const valueFromRenderAll = locValue[1];
    const value = `${Object.values(valueFromRenderAll)[1]}`;
    id = value.split("-")[0];
  } else if (typeof locValue === "string" && locValue !== "") {
    locValue = locValue.replaceAll(ID_ZONES, "");
    id = locValue.split("-")[0];
  }
  level0(locations).forEach((loc) => {
    if (loc.id === id) level = loc;
    loc.toString = function locToString() {
      return `${this.name}`;
    };
  });
  if (fieldAttributes) fieldAttributes.value[1].value = id;
  return level;
};

export const level1value = (
  location: any,
  locations: ZonesRepresentation
): ZonesFieldRepresentation => {
  let locValue = location.value;
  let level: ZonesFieldRepresentation = locValue;
  const levels1: ZonesFieldRepresentation[] = level1(locations);
  let id: string | undefined = "";
  if (Array.isArray(locValue)) {
    fieldAttributes = location;
    const valueFromRenderAll = locValue[1];
    const value = `${Object.values(valueFromRenderAll)[1]}`;
    const splittedLocation = value.split("-");
    id = splittedLocation[0] + "-" + splittedLocation[1];
  } else if (typeof locValue === "string" && locValue !== "") {
    locValue = locValue.replaceAll(ID_ZONES, "");
    const splittedLocation = locValue.split("-");
    let id1: string | undefined = "";
    if (splittedLocation.length >= 2)
      id1 = splittedLocation[0] + "-" + splittedLocation[1];
    else id1 = findFirstElement(levels1, splittedLocation[0]);
    id = id1;
  }
  levels1.forEach((loc) => {
    if (loc.id === id) level = loc;
    loc.toString = function locToString() {
      return `${this.name}`;
    };
  });
  if (fieldAttributes) fieldAttributes.value[1].value = id;
  return level;
};

export const level2value = (
  location: any,
  locations: ZonesRepresentation
): ZonesFieldRepresentation => {
  let locValue = location.value;
  let level: ZonesFieldRepresentation = locValue;
  const levels2: ZonesFieldRepresentation[] = level2(locations);
  let id: string | undefined = "";
  if (Array.isArray(locValue)) {
    fieldAttributes = location;
    const valueFromRenderAll = locValue[1];
    const value = `${Object.values(valueFromRenderAll)[1]}`;
    const splittedLocation = value.split("-");
    id =
      splittedLocation[0] +
      "-" +
      splittedLocation[1] +
      "-" +
      splittedLocation[2];
  } else if (typeof locValue === "string" && locValue !== "") {
    locValue = locValue.replaceAll(ID_ZONES, "");
    const splittedLocation = locValue.split("-");
    let id1: string | undefined = "";
    let id2: string | undefined = "";
    if (splittedLocation.length >= 2)
      id1 = splittedLocation[0] + "-" + splittedLocation[1];
    else id1 = findFirstElement(level1(locations), splittedLocation[0]);
    if (splittedLocation.length >= 3) id2 = id1 + "-" + splittedLocation[2];
    else id2 = findFirstElement(levels2, id1);
    id = id2;
  }
  levels2.forEach((loc) => {
    if (loc.id === id) level = loc;
    loc.toString = function locToString() {
      return `${this.name}`;
    };
  });
  if (fieldAttributes) fieldAttributes.value[1].value = id;
  return level;
};

export const level3value = (
  location: any,
  locations: ZonesRepresentation
): ZonesFieldRepresentation => {
  let locValue = location.value;
  let level: ZonesFieldRepresentation = locValue;
  const levels3: ZonesFieldRepresentation[] = level3(locations);
  let id: string | undefined = "";
  if (Array.isArray(locValue)) {
    fieldAttributes = location;
    const valueFromRenderAll = locValue[1];
    const value = `${Object.values(valueFromRenderAll)[1]}`;
    id = value;
  } else if (typeof locValue === "string" && locValue !== "") {
    locValue = locValue.replaceAll(ID_ZONES, "");
    const splittedLocation = locValue.split("-");
    let id1: string | undefined = "";
    let id2: string | undefined = "";
    let id3: string | undefined = "";
    if (splittedLocation.length >= 2)
      id1 = splittedLocation[0] + "-" + splittedLocation[1];
    else id1 = findFirstElement(level1(locations), splittedLocation[0]);
    if (splittedLocation.length >= 3) id2 = id1 + "-" + splittedLocation[2];
    else id2 = findFirstElement(level2(locations), id1);
    if (splittedLocation.length >= 4) id3 = id2 + "-" + splittedLocation[3];
    else id3 = findFirstElement(level3(locations), id2);
    id = id3;
  }
  levels3.forEach((loc) => {
    if (loc.id === id) level = loc;
    loc.toString = function locToString() {
      return `${this.name}`;
    };
  });
  if (fieldAttributes) fieldAttributes.value[1].value = id;
  return level;
};

export const findFirstElement = (
  locations: ZonesFieldRepresentation[],
  id?: string
): string | undefined => {
  return locations.filter(
    (location) => id !== undefined && location.id?.startsWith(id)
  )[0].id;
};
