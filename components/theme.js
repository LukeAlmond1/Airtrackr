import React from "react";
import { useStateContext } from "../context/context";

function ThemeHandler() {
  const { error, setError } = useStateContext();

  const theme = {
    container: {
      position: "relative",
      width: "100%",
      // border: "1px solid red"
    },
    input: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      background: "transparent",
      padding: "17px 15px 17px 15px",
      border:
        error === "Please fill all input fields"
          ? "2px solid #b91c1c"
          : "2px solid black",
      color: error === "Please fill all input fields" ? "#b91c1c" : "black",
      width: "100%",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      borderRadius: "3px",
    },
    inputFocused: {
      outline: "none",
    },

    suggestionsContainer: {
      display: "none",
    },
    suggestionsContainerOpen: {
      position: "absolute",
      width: "100%",
      top: "50px",
      zIndex: 100,
      background: "#EFEFEF",
      borderLeft: "2px solid black",
      borderTop: "2px solid black",
      borderRight: "2px solid black",
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 700,
      maxHeight: "300px",
      overflowY: "scroll",
      display: "flex",
      flexDirection: "column",
    },

    suggestionsList: {
      width: "100%",
    },
    suggestion: {
      cursor: "pointer",
      padding: "10px 20px",
      borderBottom: "2px solid black",
      // borderLeft: "2px solid black",
      // borderRight: "2px solid black",
      fontSize: 18,
      width: "100%",
    },
    suggestionHighlighted: {
      backgroundColor: "black",
      color: "white",
    },
  };

  return theme;
}

export default ThemeHandler;
