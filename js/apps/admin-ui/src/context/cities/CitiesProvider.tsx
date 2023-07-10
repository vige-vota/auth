import axios, { AxiosResponse } from "axios";
import environment from "../../environment";
import { useState } from "react";

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
