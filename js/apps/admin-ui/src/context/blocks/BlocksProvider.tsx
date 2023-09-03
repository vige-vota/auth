import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAdminClient, useFetch } from "../auth/AdminClient";
import type { ClientQuery } from "@keycloak/keycloak-admin-client/lib/resources/clients";
import { fieldAttributes, initFieldAttributes } from "../RealmsContext";

export const ID_BLOCK = "blocks---";
export interface BlocksRepresentation {
  votingPapers: BlocksFieldRepresentation[];
}

export interface BlocksFieldRepresentation {
  id?: number;
  name?: string;
  votingPapers: VotingPaperRepresentation[];
}

export interface VotingPaperRepresentation {
  id?: number;
  name?: string;
  groups?: GroupRepresentation[];
  parties?: PartyRepresentation[];
}

export interface GroupRepresentation {
  id?: number;
  name?: string;
  parties?: PartyRepresentation[];
}

export interface PartyRepresentation {
  id?: number;
  name?: string;
  candidates?: CandidateRepresentation[];
}

export interface CandidateRepresentation {
  id?: number;
  name?: string;
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

export const blockvalue = (
  field: any,
  blocks: BlocksRepresentation
): VotingPaperRepresentation => {
  let level: any = field.value;
  initFieldAttributes(field);
  const levels: VotingPaperRepresentation[] = blocksLevel(blocks);
  let id = 0;
  if (Array.isArray(level)) {
    const valueFromRenderAll = level[0];
    const value = `${Object.values(valueFromRenderAll)[1]}`;
    id = +value;
  } else if (typeof level === "string") {
    level = level.replaceAll(ID_BLOCK, "");
    id = +level;
  }
  levels.forEach((block) => {
    if (block.id === id) level = block;
    block.toString = function locToString() {
      return `${this.name}`;
    };
  });
  if (fieldAttributes) fieldAttributes.value[0].value = id.toString();
  return level;
};

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
