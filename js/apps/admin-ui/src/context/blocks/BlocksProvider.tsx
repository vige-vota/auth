import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAdminClient, useFetch } from "../auth/AdminClient";
import type { ClientQuery } from "@keycloak/keycloak-admin-client/lib/resources/clients";

export const ID_BLOCK = "block";
export interface BlocksRepresentation {
  votingPapers: BlocksFieldRepresentation[];
}

export interface BlocksFieldRepresentation {
  id: number;
  name: string;
  votingPapers: VotingPaperRepresentation[];
}

export interface VotingPaperRepresentation {
  id: number;
  name: string;
  groups?: GroupRepresentation[];
  parties?: PartyRepresentation[];
}

export interface GroupRepresentation {
  id: number;
  name: string;
  parties?: PartyRepresentation[];
}

export interface PartyRepresentation {
  id: number;
  name: string;
  candidates?: CandidateRepresentation[];
}

export interface CandidateRepresentation {
  id: number;
  name: string;
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

const flatVotingPapers: VotingPaperRepresentation[] = [];

export const blocksLevel = (
  blocks: BlocksRepresentation
): VotingPaperRepresentation[] => {
  if (flatVotingPapers.length === 0) {
    blocks.votingPapers.forEach((e: VotingPaperRepresentation) => {
      flatVotingPapers.push(e);
      if (e.groups) {
        e.groups.forEach((f) => {
          f.name = "------ " + f.name;
          flatVotingPapers.push(f);
          if (f.parties) {
            f.parties.forEach((h) => {
              h.name = "------------------------ " + h.name;
              flatVotingPapers.push(h);
              if (h.candidates) {
                h.candidates.forEach((i) => {
                  i.name = "------------------------------------ " + i.name;
                  flatVotingPapers.push(i);
                });
              }
            });
          }
        });
      }
      if (e.parties) {
        e.parties.forEach((g) => {
          g.name = "------ " + g.name;
          flatVotingPapers.push(g);
          if (g.candidates) {
            g.candidates.forEach((l) => {
              l.name = "------------------------ " + l.name;
              flatVotingPapers.push(l);
            });
          }
        });
      }
    });
  }
  return flatVotingPapers;
};

export const getDescription = (
  blocks: VotingPaperRepresentation[],
  field: any
): string => {
  let description = "";
  let id = "";
  if (field.value !== undefined && field.value !== "")
    id = field.value[0].value;
  if (blocks.length > 0 && id != "-1")
    description = blocks.filter((block) => block.id === +id)[0].name;
  return description;
};
