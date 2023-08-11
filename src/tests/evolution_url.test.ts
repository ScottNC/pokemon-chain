import { POKEMON_URL } from "../config";
import { getEvolutionURL } from "../services/evolution_url";
import { SpeciesResponse } from "../types/pokemon_types";
import axios from 'axios';

jest.mock('axios');

describe('getEvolution', () => {

  afterEach(() => {
    (axios.get as jest.Mock).mockReset();
  });

  const pokemonSpeciesResponse : { data : SpeciesResponse } = {
    data: {
      evolution_chain : {
        url: POKEMON_URL + '/evolution-chain/12341234/'
      }
    }
  };
  
  it('should return the evolution URL for a given species', async () => {
    (axios.get as jest.Mock).mockResolvedValue(pokemonSpeciesResponse);

    const species = 'noodles';
    const evolutionURL = await getEvolutionURL(species);

    expect(evolutionURL).toBe(POKEMON_URL + '/evolution-chain/12341234/')
  });

  it('should make the correct call to the Pokemon API', async () => {
    (axios.get as jest.Mock).mockResolvedValue(pokemonSpeciesResponse);

    const species = 'pizza';
    await getEvolutionURL(species);

    expect(axios.get).toHaveBeenCalledWith(POKEMON_URL + '/pokemon-species/pizza');
  });

  it('should make the correct call to the Pokemon API when inputting a capitalised species', async () => {
    (axios.get as jest.Mock).mockResolvedValue(pokemonSpeciesResponse);

    const species = 'SPAGHETTI';
    await getEvolutionURL(species);

    expect(axios.get).toHaveBeenCalledWith(POKEMON_URL + '/pokemon-species/spaghetti');
  });

  it('should make the correct call to the Pokemon API when inputting species with spaces', async () => {
    (axios.get as jest.Mock).mockResolvedValue(pokemonSpeciesResponse);

    const species = ' hamburger ';
    await getEvolutionURL(species);

    expect(axios.get).toHaveBeenCalledWith(POKEMON_URL + '/pokemon-species/hamburger');
  });

  it('should error when API request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Request failed'));
    const species = 'chips';
    await expect(getEvolutionURL(species)).rejects.toThrow('Species chips does not exist');
  });
  
});
