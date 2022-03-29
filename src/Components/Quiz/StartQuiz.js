import React, { useState, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";

import useFetch from "../../hooks/use-fetch";

export default function StartQuiz(props) {
  const { pokemonIdList, onSubmit } = props;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const inputField = useRef("null");
  const currentPokemonId = pokemonIdList[currentQuestion];
  const { pokemonName, isLoading } = useFetch(currentPokemonId);

  const handleSubmit = () => {
    if (currentQuestion >= 9) {
      onSubmit(score);

      return;
    }

    if (inputField.current.value === pokemonName) {
      setScore((prevScore) => prevScore + 1);
    }

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIdList[currentQuestion]}.png`}
          alt="Pokemon image"
        ></img>
        <p>{`${currentQuestion}
      ${pokemonIdList[currentQuestion]}`}</p>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            inputRef={inputField}
            id="input-with-sx"
            label="With sx"
            variant="standard"
          />

          <Button variant="contained" onClick={handleSubmit}>
            Next Pokemon
          </Button>
          <p>{pokemonName}</p>
        </Box>
      </Box>
    </div>
  );
}
