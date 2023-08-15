import axios, { AxiosResponse } from "axios";
import { getEvolutionURL } from "./evolution_url";
import { EvolutionChain, EvolutionChainResponse, EvolvesTo } from "../types/pokemon_types";

export async function getChain (species: string) {
  const evolutionURL: string = await getEvolutionURL(species);
  const response: AxiosResponse = await axios.get(evolutionURL);
  const data: EvolutionChainResponse = response.data;

  if (!data?.chain)
    throw new Error('Evolution Chain is empty')
    
  const chain: EvolutionChain | null = translateChain([data.chain]);

  if (!chain)
    throw new Error('Evolution Chain is empty')
    
  return chain;
}

function translateChain (chain: EvolvesTo[]) {
  if (!chain.length) return null;

  const { species, evolves_to } = chain[0];

  const variations = translateChain(evolves_to);

  const translatedChain: EvolutionChain = {
    name: species.name,
    variations: variations ? [variations] : []
  }

  return translatedChain;
}
