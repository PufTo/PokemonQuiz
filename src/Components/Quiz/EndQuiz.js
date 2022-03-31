import React from "react";
import { Button, Container } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./EndQuiz.module.css";

export default function EndQuiz(props) {
  const { onStartQuiz, finalScore } = props;

  const handleStartQuiz = () => {
    onStartQuiz();
  };

  return (
    <Container className={styles.fullHeight}>
      <p className={styles.scoreEndScreen}>{`Score: ${finalScore}`}</p>
      <Button
        className={styles.buttonEndScreen}
        variant="outlined"
        size="large"
        endIcon={<SendIcon />}
        onClick={handleStartQuiz}
        sx={{
          borderRadius: "5px",
          marginBottom: "2rem",
          fontSize: "1.8rem",
        }}
      >
        Start a new Quiz
      </Button>
    </Container>
  );
}
