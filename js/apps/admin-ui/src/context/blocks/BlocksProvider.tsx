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
  votingPapers: VotingPaperRepresentation[];
}

export interface VotingPaperRepresentation {
  id?: string;
  name?: string;
  groups?: GroupRepresentation[];
  parties?: PartyRepresentation[];
}

export interface GroupRepresentation {
  id?: string;
  name?: string;
  parties?: PartyRepresentation[];
}

export interface PartyRepresentation {
  id?: string;
  name?: string;
  candidates?: CandidateRepresentation[];
}

export interface CandidateRepresentation {
  id?: string;
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
  block: any,
  blocks: BlocksRepresentation
): VotingPaperRepresentation => {
  let level: VotingPaperRepresentation = block;
  const levels: VotingPaperRepresentation[] = blocksLevel(blocks);
  if (Array.isArray(location)) {
    const valueFromRenderAll = block[1];
    const value = `${Object.values(valueFromRenderAll)[1]}`;
    const id = value;
    levels.forEach((block) => {
      if (block.id === id) level = block;
      block.toString = function locToString() {
        return `${this.name}`;
      };
    });
  } else if (typeof block === "string" && block !== "") {
    const splittedBlock = block.split("-");
    let id1: string | undefined = "";
    if (splittedBlock.length >= 2)
      id1 = splittedBlock[0] + "-" + splittedBlock[1];
    const id = id1;
    levels.forEach((loc) => {
      if (loc.id === id) level = loc;
      loc.toString = function locToString() {
        return `${this.name}`;
      };
    });
  }
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
