import React, { useEffect, useState } from "react";
import themeHandler from "./theme";
import Image from "next/image";
import drop from "../media/drop.svg";
import minus from "../media/minus.svg";
import { useStateContext } from "../context/context";

export default function GetDate({ question, data, value, setValue }) {
  const [showAll, setShowAll] = useState(false);
  const { error, setError } = useStateContext();

  return (
    <div>
      <p
        className={`font-[800] text-lg font-cust mb-2 ${
          error !== "" ? "text-red-700" : "text-black"
        }`}
      >
        {question}
      </p>
      <div className="flex items-center relative">
        <div
          className="outline-none text-black"
          style={{
            ...themeHandler().input,
            border: error !== "" ? "2px solid #b91c1c" : "2px solid black",
            color: error !== "" ? "#b91c1c" : "black",
          }}
          disabled
        >
          {String(value).split(" ").splice(0, 4).join(" ")}
        </div>
        <span
          onClick={() => setShowAll(!showAll)}
          className="absolute right-4 flex cursor-pointer  w-8 h-8 items-center justify-center"
        >
          {showAll ? <Image src={minus} /> : <Image src={drop} />}
        </span>
        {showAll && (
          <div style={themeHandler().suggestionsContainerOpen}>
            <div style={themeHandler().suggestionsList}>
              {data.map((date, i) => (
                <div
                  onClick={() => {
                    console.log(new Date(date));
                    setValue(date);
                    setShowAll(false);
                    setError("");
                  }}
                  key={i}
                  className="hover:bg-black hover:text-white"
                  style={themeHandler().suggestion}
                >
                  {String(date).split(" ").splice(0, 4).join(" ")}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
