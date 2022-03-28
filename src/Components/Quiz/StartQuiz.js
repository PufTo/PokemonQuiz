import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import useFetch from "../Hooks/use-fetch";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { wait } from "@testing-library/user-event/dist/utils";

export default function StartQuiz(props) {
  const { pokemonIdList, submitFinalScore } = props;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const { pokemonName, isLoading } = useFetch(
    currentQuestion,
    pokemonIdList[currentQuestion]
  );
  const [score, setScore] = useState(0);

  const inputField = useRef("null");

  const handleSubmit = () => {
    console.log(currentQuestion);
    setIsRevealing(true);
    //animation
    const timer = setTimeout(() => {
      if (currentQuestion >= 9) {
        submitFinalScore(score);
        return;
      }
      if (inputField.current.value === pokemonName)
        setScore((prevScore) => prevScore + 1);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      console.log(score);
      console.log(pokemonName);
    }, 1000);

    // clearInterval(timer);
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
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
