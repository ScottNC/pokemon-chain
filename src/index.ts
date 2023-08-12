import { getChain } from "./services/chain";
import { EvolutionChain } from "./types/pokemon_types";
import { createInterface } from 'node:readline';

const reader = createInterface({
	input: process.stdin,
	output: process.stdout,
});

function start(species: string | undefined) {
  console.log(`------------ Welcome ------------`);
  if (species) displayChain(species);
  else {
    console.log('\nNo Species Name Input')
    reader.question(`\nWhat is the name of the species?\n`, displayChain);
  }
}

async function displayChain(species: string) {
  console.log(`\nSpecies Name: ${species}`);
  console.log(`\nEvolution Chain Processing...\n`);
  try {
    const chain: EvolutionChain = await getChain(species);
    console.log(`Chain Processed Successfully`);
    console.log(`\n${JSON.stringify(chain, null, 2)}`);
  } catch (e) {
    console.log(e);
  } finally {
    reader.close();
  }
}

start(process.argv[2]);
