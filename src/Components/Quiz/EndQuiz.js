import React from "react";
import { Button, Container } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import styles from "./EndQuiz.module.css";

export default function EndQuiz(props) {
  const { onStartQuiz, finalScore } = props;

  const handleStartQuiz = () => {
    onStartQuiz();
  };

  return (
    <Container className={styles.fullHeight}>
      <p className={styles.scoreEndScreen} >{`Score:${finalScore}`}</p>
      <Button className={styles.buttonEndScreen} variant="contained" size="large" endIcon={<SendIcon/>} onClick={handleStartQuiz}>
        Start a new Quiz
      </Button>
    </Container>
  );
}
