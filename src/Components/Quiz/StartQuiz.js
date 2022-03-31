import React, { useState, useRef } from "react";

import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Container,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "../../index.css";

import useFetch from "../../hooks/use-fetch";
import styles from "./StartQuiz.module.css";

export default function StartQuiz(props) {
  const { pokemonIdList, onSubmit } = props;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState({
    isSubmitted: false,
    isCorrect: false,
  });
  const inputField = useRef("null");
  const currentPokemonId = pokemonIdList[currentQuestion];
  const { pokemon, isLoading } = useFetch(currentPokemonId);

  // console.log("render");
  console.log(answer);
  const handleSubmit = () => {
    const isCorrect = inputField.current.value === pokemon.name;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setAnswer({ isCorrect: isCorrect, isSubmitted: true });
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= 9) {
      onSubmit(score);

      return;
    }
    setAnswer({ isSubmitted: false, isCorrect: false });
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const hide = { display: "none" };
  const show = { display: "inline-block" };

  const submitButtonVisibility = answer.isSubmitted ? hide : show;
  const nextButtonVisibility = answer.isSubmitted ? show : hide;

  return !isLoading ? (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className={styles.pokeCard}>
        <img
          className={styles.cardImage}
          src={pokemon.image}
          alt="Pokemon silhouette"
        ></img>

        <Box
          sx={{
            width: "80%",
            display: "block",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {answer.isCorrect === true && answer.isSubmitted && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <span className={styles.bigText}>
                <CheckIcon style={{ fontSize: "2rem" }} />
                GOOD JOB
              </span>
            </Box>
          )}

          {answer.isCorrect === false && answer.isSubmitted && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <span className={styles.bigText}>
                <ClearIcon style={{ fontSize: "2rem" }} />
                WRONG
              </span>
            </Box>
          )}

          <div className={styles.inputContainer}>
            <TextField
              inputRef={inputField}
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              size="small"
            />
            <Button
              sx={submitButtonVisibility}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              sx={nextButtonVisibility}
              variant="contained"
              onClick={handleNextQuestion}
            >
              Next Question
            </Button>
          </div>

          <p className="font">{pokemon.name}</p>
        </Box>
      </Box>
    </Container>
  ) : (
    <CircularProgress />
  );
}
