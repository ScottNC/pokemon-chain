import axios, { AxiosResponse } from "axios";
import { POKEMON_URL } from "../config";

export async function getEvolutionURL (species: string) {
  try {
    const response: AxiosResponse = await axios.get(POKEMON_URL + '/pokemon-species/' + species);
    const data: any = response.data;
    return data.evolution_chain.url
  } catch (error) {
    throw new Error('Failed to fetch evolution URL');
  }
}