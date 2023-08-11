import axios, { AxiosResponse } from "axios";
import { POKEMON_URL } from "../config";
import { SpeciesResponse } from "../types/pokemon_types";

export async function getEvolutionURL (species: string) {
  try {
    const response: AxiosResponse = await axios.get(`${POKEMON_URL}/pokemon-species/${species.trim().toLowerCase()}`);
    const data: SpeciesResponse = response.data;
    return data.evolution_chain.url
  } catch (error) {
    throw new Error(`Species ${species} does not exist`);
  }
}