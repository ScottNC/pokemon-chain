import { POKEMON_URL } from "../config";
import { getChain } from "../services/chain";
import { getEvolutionURL } from "../services/evolution_url";
import { EvolutionChain, EvolutionChainResponse } from "../types/pokemon_types";
import axios from 'axios';

jest.mock('axios');
jest.mock('../services/evolution_url')

describe('getChain', () => {

  afterEach(() => {
    (getEvolutionURL as jest.Mock).mockReset();
    (axios.get as jest.Mock).mockReset();
  });

  const chainResponseSingle : { data : EvolutionChainResponse } = {
    data: {
      chain: {
        evolves_to: [],
        species: {
          name: 'banana'
        }
      }
    }
  };

  const expectedChainSingle : EvolutionChain = {
    name: 'banana',
    variations: []
  }

  const chainResponseDouble : { data : EvolutionChainResponse } = {
    data: {
      chain: {
        evolves_to: [{
          evolves_to: [],
          species: {
            name: 'grape'
          }
        }],
        species: {
          name: 'apple'
        }
      }
    }
  };

  const expectedChainDouble : EvolutionChain = {
    name: 'apple',
    variations: [{
      name: 'grape',
      variations: []
    }]
  }
  
  it('should return a single layered chain', async () => {
    (getEvolutionURL as jest.Mock).mockResolvedValue(POKEMON_URL + 'evolution-chain/12341234/');
    (axios.get as jest.Mock).mockResolvedValue(chainResponseSingle);

    const species = 'banana';
    const chain = await getChain(species);

    expect(chain).toEqual(expectedChainSingle);
  });

  it('should return a double layered chain', async () => {
    (getEvolutionURL as jest.Mock).mockResolvedValue(POKEMON_URL + 'evolution-chain/12341234/');
    (axios.get as jest.Mock).mockResolvedValue(chainResponseDouble);

    const species = 'apple';
    const chain = await getChain(species);

    expect(chain).toEqual(expectedChainDouble);
  });

});