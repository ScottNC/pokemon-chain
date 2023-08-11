import axios, { AxiosResponse } from "axios";
import { getEvolutionURL } from "./evolution_url";
import { EvolutionChain, EvolutionChainResponse, EvolvesTo } from "../types/pokemon_types";

export async function getChain (species: string) {
  const evolutionURL: string = await getEvolutionURL(species);
  try {
    const response: AxiosResponse = await axios.get(evolutionURL);
    const data: EvolutionChainResponse = response.data;

    const { species } : EvolvesTo = data.chain;

    const chain: EvolutionChain = {
      name: species.name,
      variations: []
    };
    
    return chain;
  } catch (error) {
    throw new Error('Error fetching evolution chain');
  }
}