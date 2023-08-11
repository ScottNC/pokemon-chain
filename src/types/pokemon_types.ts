export type SpeciesResponse = {
  evolution_chain : {
    url: string;
  }
}

export type EvolutionChainResponse = {
  chain: EvolvesTo;
}

export type EvolvesTo = {
  evolves_to: EvolvesTo[];
  species: {
    name: string;
  }
}

export type EvolutionChain = {
  name: string;
  variations: EvolutionChain[];
}