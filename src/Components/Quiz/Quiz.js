import React, { useState } from "react";
import EndQuiz from "./EndQuiz";
import StartQuiz from "./StartQuiz";

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }
// // TO DO make sure numbers are UNIQUE
// function generateRandomPokemonNumbers(nrOfPokemon, minID, maxID) {
//   const initialEmptyArray = Array.from({ length: nrOfPokemon }, () =>
//     getRandomInt(0, 151)
//   );

// }

const pokemonNumbers = (numberOfPokemons = 10) => {
  return Array(numberOfPokemons)
    .fill()
    .map(() => Math.round(Math.random() * 151));
};

export default function Quiz() {
  const [finalScore, setFinalScore] = useState(-1);
  const updateScore = (newScore) => {
    setFinalScore(newScore);
  };
  const newQuiz = () => {
    setFinalScore(-1);
  };
  console.log(finalScore);
  return finalScore === -1 ? (
    <StartQuiz
      pokemonIdList={pokemonNumbers()}
      submitFinalScore={updateScore}
    />
  ) : (
    <EndQuiz startNewQuiz={newQuiz} finalScore={finalScore} />
  );
}
