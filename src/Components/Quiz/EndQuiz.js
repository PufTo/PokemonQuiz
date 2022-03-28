import React from "react";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function EndQuiz(props) {
  const { startNewQuiz, finalScore } = props;

  const handleStartNewQuiz = () => {
    startNewQuiz();
  };

  return (
    <Box>
      <p>{`score: ${finalScore}`}</p>
      <Button variant="contained" onClick={handleStartNewQuiz}>
        Start a new Quiz!
      </Button>
    </Box>
  );
}
