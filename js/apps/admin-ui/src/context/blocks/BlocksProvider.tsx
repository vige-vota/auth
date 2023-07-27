import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAdminClient, useFetch } from "../auth/AdminClient";
import type { ClientQuery } from "@keycloak/keycloak-admin-client/lib/resources/clients";

export interface BlocksRepresentation {
  votingPapers: BlocksFieldRepresentation[];
}

export interface BlocksFieldRepresentation {
  id?: string;
  name?: string;
  votingPapers: BlocksFieldRepresentation[];
}

export const initBlocks = () => {
  const { adminClient } = useAdminClient();
  const [blocks, setBlocks] = useState<BlocksRepresentation>({
    votingPapers: [],
  });

  useFetch(
    () => {
      const params: ClientQuery = {
        max: 20,
      };
      params.clientId = "votingPapers";
      params.search = true;
      return adminClient.clients.find(params);
    },
    (clients) => {
      const rootUrl = clients[0].rootUrl;
      const url = rootUrl + "/votingPapers?all&info";
      axios.get(url).then((response: AxiosResponse) => {
        setBlocks(response.data);
      });
    },
    []
  );

  return blocks;
};

export const blocksLevel = (blocks: BlocksRepresentation) => {
  return blocks.votingPapers;
};
