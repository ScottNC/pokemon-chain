# Pokemon Evolution Chain Finder

## Welcome

Hello Ash!

Here you can find an evolution chain of any Pokemon species

## Setup

To setup follow the instructions below:

 - First step is to clone this repository

  `git clone https://github.com/ScottNC/pokemon-chain`

 - Then install all the dependencies
 
  `npm install`

Well done the program is setup
## Testing

To make sure the program is working run `npm test`

All the tests should pass

## How to Use

To run the program to find an evolution chain run `npm start (species name)`

Alternatively you can run `npm start` and you will be asked to input youe chosen species

Below is an example of what to expect to see in the output:

```
------------ Welcome ------------

No Species Name Input

What is the name of the species?
butterfree

Species Name: butterfree

Evolution Chain Processing...

Chain Processed Successfully

{
  "name": "caterpie",
  "variations": [
    {
      "name": "metapod",
      "variations": [
        {
          "name": "butterfree",
          "variations": []
        }
      ]
    }
  ]
}
```