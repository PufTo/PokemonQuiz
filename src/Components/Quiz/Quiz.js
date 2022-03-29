import React, { useState } from "react";

import EndQuiz from "./EndQuiz";
import StartQuiz from "./StartQuiz";

const getPokemonIdList = (numberOfPokemons = 10) => {
  return Array(numberOfPokemons)
    .fill()
    .map(() => Math.round(Math.random() * 151));
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
