import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import themeHandler from "./theme";
import Image from "next/Image";
import drop from "../media/drop.svg";
import minus from "../media/minus.svg";
import { useStateContext } from "../context/context";
import axios from "axios";

export default function GetAirport({
  data,
  question,
  value,
  setValue,
  placeholder,
  key,
  setQuery,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { error, setError } = useStateContext();

  function onChange(e) {
    setShowAll(false);
    setValue(String(e.target.value));
  }

  const inputProps = {
    placeholder: placeholder,
    value,
    onChange: onChange,
    spellCheck: false,
  };

  return (
    <div>
      <p
        className={`font-[800] text-lg font-cust mb-2 ${
          error === "Please fill all input fields"
            ? "text-red-700"
            : "text-black"
        }`}
      >
        {question}
      </p>
      <div className="flex items-center relative">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={async ({ value }) => {
            if (!value) {
              return;
            }
            try {
              const res = await axios.post("/api/query", {
                value: value,
                type: "airports",
              });
              setSuggestions(
                res.data.dataArray.map((e) => ({
                  name: e.name.toLowerCase(),
                  iata: e.iata_code.toLowerCase(),
                }))
              );
            } catch (error) {
              setSuggestions([]);
            }
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
          inputProps={inputProps}
          onSuggestionSelected={(_, { suggestion }) => {
            setValue(suggestion.name);
            setQuery(suggestion.iata);
          }}
          theme={themeHandler()}
        />
      </div>
    </div>
  );
}
