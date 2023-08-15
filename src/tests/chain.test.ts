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
        evolves_to: [chainResponseSingle.data.chain],
        species: {
          name: 'apple'
        }
      }
    }
  };

  const expectedChainDouble : EvolutionChain = {
    name: 'apple',
    variations: [expectedChainSingle]
  }

  const chainResponseTriple : { data : EvolutionChainResponse } = {
    data: {
      chain: {
        evolves_to: [chainResponseDouble.data.chain],
        species: {
          name: 'grape'
        }
      }
    }
  };

  const expectedChainTriple : EvolutionChain = {
    name: 'grape',
    variations: [expectedChainDouble]
  }
  
  it('should return a single layered chain', async () => {
    (getEvolutionURL as jest.Mock).mockResolvedValue(POKEMON_URL + '/evolution-chain/12341234/');
    (axios.get as jest.Mock).mockResolvedValue(chainResponseSingle);

    const species = 'banana';
    const chain = await getChain(species);

    expect(chain).toEqual(expectedChainSingle);
  });

  it('should return a double layered chain', async () => {
    (getEvolutionURL as jest.Mock).mockResolvedValue(POKEMON_URL + '/evolution-chain/12341234/');
    (axios.get as jest.Mock).mockResolvedValue(chainResponseDouble);

    const species = 'apple';
    const chain = await getChain(species);

    expect(chain).toEqual(expectedChainDouble);
  });

  it('should return a triple layered chain', async () => {
    (getEvolutionURL as jest.Mock).mockResolvedValue(POKEMON_URL + '/evolution-chain/12341234/');
    (axios.get as jest.Mock).mockResolvedValue(chainResponseTriple);

    const species = 'grape';
    const chain = await getChain(species);

    expect(chain).toEqual(expectedChainTriple);
  });

  it('should error for empty evolution data', async () => {
    (getEvolutionURL as jest.Mock).mockResolvedValue(POKEMON_URL + '/evolution-chain/12341234/');
    (axios.get as jest.Mock).mockResolvedValue([]);

    const species = 'grape';
    await expect(getChain(species)).rejects.toThrow('Evolution Chain is empty');
  });

  // it('should error when the API call to get the evolution data fails', async () => {
  //   (getEvolutionURL as jest.Mock).mockResolvedValue(POKEMON_URL + '/evolution-chain/12341234/');
  //   (axios.get as jest.Mock).mockResolvedValue({ response: {status: 404, data: 'Not Found' } });

  //   const species = 'grape';
  //   await expect(getChain(species)).rejects.toThrow('Request failed with status code 404');
  // });

  it('should make the same call that getEvolutionURL returned', async () => {
    (getEvolutionURL as jest.Mock).mockResolvedValue(POKEMON_URL + '/evolution-chain/56785678/');
    (axios.get as jest.Mock).mockResolvedValue(chainResponseSingle);

    const species = 'banana';
    await getChain(species);

    expect(axios.get).toHaveBeenCalledWith(POKEMON_URL + '/evolution-chain/56785678/');
  });

});