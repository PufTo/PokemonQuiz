import React from 'react';
import { Button } from "@mui/material";
import './StartApp.css';

export default function StartApp(props) {
  return (
    <div className='pokemon-quiz__start-app'>
      <Button variant='outlined' onClick={props.onClick}>Start Quiz</Button>
    </div>
  );
}

