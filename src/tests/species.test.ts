import { getEvolutionURL } from "../services/evolution_url";

describe('getEvolution', () => {
  it('should return the evolution URL for a given species', async () => {
    const species = 'metapod';

    const evolutionURL = await getEvolutionURL(species);

    expect(evolutionURL).toBe('https://pokeapi.co/api/v2/evolution-chain/4/')
  })
})