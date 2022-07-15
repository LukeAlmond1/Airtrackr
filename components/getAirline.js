import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import themeHandler from "./theme";
import Image from "next/Image";
import drop from "../media/drop.svg";
import minus from "../media/minus.svg";
import { useStateContext } from "../context/context";

export default function GetAirline({
  data,
  question,
  value,
  setValue,
  placeholder,
}) {
  const [showAll, setShowAll] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const { error, setError, setAirlineIata } = useStateContext();

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data.filter(
          (airport) =>
            airport.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

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
          onSuggestionsFetchRequested={({ value }) => {
            if (!value) {
              return;
            }

            setSuggestions(getSuggestions(value));
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
          inputProps={inputProps}
          onSuggestionSelected={(_, { suggestion }) => {
            setValue(suggestion.name);
            setAirlineIata(suggestion.iata);
          }}
          theme={themeHandler()}
        />
        <span
          onClick={() => setShowAll(!showAll)}
          className="absolute right-4 flex cursor-pointer  w-8 h-8 items-center justify-center"
        >
          {showAll ? <Image src={minus} /> : <Image src={drop} />}
        </span>
        {showAll && (
          <div style={themeHandler().suggestionsContainerOpen}>
            <div className="">
              {data.map((airport, i) => (
                <div
                  onClick={() => {
                    setValue(airport.name);
                    setShowAll(false);
                  }}
                  key={i}
                  className="hover:bg-black  hover:text-white"
                  style={themeHandler().suggestion}
                >
                  {airport.name.toLowerCase()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
