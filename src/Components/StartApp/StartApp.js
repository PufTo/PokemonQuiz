import React from "react";
import { Button } from "@mui/material";
import styles from "./StartApp.module.css";

export default function StartApp(props) {
  return (
    <div className={styles["pokemon-quiz__start-app"]}>
      <div className={styles.shadow}></div>
      <button className={styles.pokeball} onClick={props.onClick}>
        <div className={styles.top}></div>
        <div className={styles.bottom}></div>
        <div className={styles.middle}></div>
      </button>
    </div>
  );
}
