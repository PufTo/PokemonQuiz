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
import useFetch from "../../hooks/use-fetch";
import styles from "./StartQuiz.module.css";
import { borderRadius } from "@mui/system";
import { motion, useCycle } from "framer-motion";

import "../../index.css";
import correctAudio from "../../sounds/correct.mp3";
import wrongAudio from "../../sounds/wrong.mp3";

const motionVariants = {
  initial: { scale: 0.7, filter: "brightness(0)" },
  shadow: { scale: 1, filter: "brightness(0)" },
  reveal: { scale: 1.3, filter: "brightness(100%) grayscale(0)", opacity: 1 },
};

const playAudio = (audio) => {
  new Audio(audio).play();
};

export default function StartQuiz(props) {
  const { pokemonIdList, onSubmit } = props;
  const [imageAnimation, cycleImageAnimation] = useCycle(
    motionVariants.shadow,
    motionVariants.reveal
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState({
    isSubmitted: false,
    isCorrect: false,
  });
  const inputField = useRef("null");
  const currentPokemonId = pokemonIdList[currentQuestion];
  const { pokemon, isLoading } = useFetch(currentPokemonId);

  const handleSubmit = () => {
    console.log(inputField.current.value);
    if (!inputField.current.value) {
      inputField.current.error = true;
      return;
    }
    const pokemonNameNoDash = pokemon.name.replace("-", "");
    const inputValue = inputField.current.value.toLowerCase().trim();
    const isCorrect =
      inputValue === pokemon.name || inputValue === pokemonNameNoDash;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      playAudio(correctAudio);
    } else {
      playAudio(wrongAudio);
    }
    console.log();
    inputField.current.readOnly = true;
    cycleImageAnimation();
    setAnswer({ isCorrect: isCorrect, isSubmitted: true });
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= 9) {
      onSubmit(score);

      return;
    }
    inputField.current.readOnly = false;
    inputField.current.value = "";
    setAnswer({ isSubmitted: false, isCorrect: false });
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    cycleImageAnimation();
  };

  const hide = { display: "none" };
  const show = { display: "inline-block" };

  const submitButtonVisibility = answer.isSubmitted ? hide : show;
  const nextButtonVisibility = answer.isSubmitted ? show : hide;

  const questionFeedback = answer.isCorrect ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <span className={styles.bigText}>
        <CheckIcon style={{ fontSize: "3rem" }} />
        CORRECT
      </span>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <span className={styles.bigText}>
        <ClearIcon style={{ fontSize: "3rem" }} />
        WRONG
      </span>
    </Box>
  );

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className={styles.pokeCard}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                width: "26rem",
                height: "26rem",
              }}
            >
              <motion.img
                variants={motionVariants}
                initial="initial"
                animate={imageAnimation}
                transition={{ duration: 1, times: [0, 0.8, 1] }}
                className={styles.cardImageSilhouette}
                src={pokemon.image}
                alt="Pokemon image reveal"
              />
            </Container>
            {answer.isSubmitted && (
              <p className={styles.pokemonName}>{pokemon.name}</p>
            )}
            {!answer.isSubmitted && <p className={styles.pokemonName}>? ? ?</p>}
            <Box
              sx={{
                width: "80%",
                display: "block",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {answer.isSubmitted && questionFeedback}
              {!answer.isSubmitted && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span className={styles.bigText} style={{ height: "3rem" }}>
                    Guess the pokemon!
                    {/* <ClearIcon
                      style={{ fontSize: "3rem", visibility: "hidden" }}
                    /> */}
                  </span>
                </Box>
              )}

              <div className={styles.inputContainer}>
                <TextField
                  inputRef={inputField}
                  autoComplete="off"
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "1.6rem", color: "#dee2e6" },
                  }}
                  sx={{
                    marginBottom: "1rem",
                    borderRadius: "10px",
                  }}
                />
                <Button
                  sx={{
                    ...submitButtonVisibility,
                    borderRadius: "10px",
                    marginBottom: "2rem",
                    fontSize: "1.6rem",
                  }}
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  submit
                </Button>
                <Button
                  sx={{
                    ...nextButtonVisibility,
                    borderRadius: "10px",
                    marginBottom: "2rem",
                    fontSize: "1.6rem",
                  }}
                  variant="outlined"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </Button>
              </div>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
