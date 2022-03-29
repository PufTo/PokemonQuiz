import React from "react";
import { Box, Button } from "@mui/material";

export default function EndQuiz(props) {
  const { onStartQuiz, finalScore } = props;

  const handleStartQuiz = () => {
    onStartQuiz();
  };

  return (
    <Box>
      <p>{`score: ${finalScore}`}</p>
      <Button variant="contained" onClick={handleStartQuiz}>
        Start a new Quiz!
      </Button>
    </Box>
  );
}
