import { POKEMON_URL } from "../config";
import { getEvolutionURL } from "../services/evolution_url";
import { SpeciesData } from "../types/pokemon_types";
import axios from 'axios';

jest.mock('axios');

describe('getEvolution', () => {

  const pokemonSpeciesData : { data : SpeciesData } = {
    data: {
      evolution_chain : {
        url: POKEMON_URL + '/evolution-chain/12341234/'
      }
    }
  };
  
  it('should return the evolution URL for a given species', async () => {

    (axios.get as jest.Mock).mockResolvedValue(pokemonSpeciesData);

    const species = 'noodles';

    const evolutionURL = await getEvolutionURL(species);

    expect(evolutionURL).toBe(POKEMON_URL + '/evolution-chain/12341234/')
  });


})