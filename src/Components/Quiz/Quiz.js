import React, { useState } from "react";

import EndQuiz from "./EndQuiz";
import StartQuiz from "./StartQuiz";

const getPokemonIdList = (numberOfPokemons = 10) => {
  const setOfPokemonId = new Set();
  while (setOfPokemonId.size < numberOfPokemons) {
    setOfPokemonId.add(Math.floor(Math.random() * 151) + 1);
  }
  const finalArray = Array.from(setOfPokemonId);
  return finalArray;
};

export default function Quiz() {
  const [finalScore, setFinalScore] = useState(-1);
  const shouldStartQuiz = finalScore === -1;

  const handleSubmit = (newScore) => {
    setFinalScore(newScore);
  };

  const handleStartQuiz = () => {
    setFinalScore(-1);
  };

  return shouldStartQuiz ? (
    <StartQuiz pokemonIdList={getPokemonIdList()} onSubmit={handleSubmit} />
  ) : (
    <EndQuiz onStartQuiz={handleStartQuiz} finalScore={finalScore} />
  );
}
