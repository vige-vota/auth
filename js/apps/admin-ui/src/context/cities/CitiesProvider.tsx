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

export const [locations, setLocations] = useState<ZonesRepresentation>({
  zones: [],
});

export const initLocations = () => {
  const url = environment.resourceUrl + "?all";
  axios.get(url).then((response: AxiosResponse) => {
    setLocations(response.data);
  });
  return locations;
};

export const level0 = () => {
  return locations.zones;
};

export const level1 = () => {
  return locations.zones.flatMap((e: ZonesFieldRepresentation) => e.zones);
};

export const level2 = () => {
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .flatMap((f: ZonesFieldRepresentation) => f.zones);
};

export const level3 = () => {
  return locations.zones
    .flatMap((e: ZonesFieldRepresentation) => e.zones)
    .flatMap((f: ZonesFieldRepresentation) => f.zones)
    .flatMap((g) => g.zones);
};
