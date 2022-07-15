import React, { useState } from "react";
import drop from "../media/drop.svg";
import minus from "../media/minus.svg";
import { useStateContext } from "../context/context";
import themeHandler from "./theme";
import Image from "next/image";

export default function FlightSelect() {
  const [allFlights, setAllFlights] = useState(false);
  const { flightView, setFlightView } = useStateContext();

  return (
    <div className=" order-2 xl:order-1 relative flex items-center ">
      <div
        onClick={() => {
          setAllFlights(!allFlights);
        }}
        className="outline-none text-black !text-lg relative"
        style={{
          ...themeHandler().input,
        }}
      >
        {flightView}
      </div>
      <span
        onClick={() => {
          setAllFlights(!allFlights);
        }}
        className="absolute right-4 flex cursor-pointer  w-8 h-8 items-center justify-center"
      >
        {allFlights ? <Image src={minus} /> : <Image src={drop} />}
      </span>
      <>
        {allFlights && (
          <>
            <div
              className="!scrollbar-hide"
              style={themeHandler().suggestionsContainerOpen}
            >
              <div style={themeHandler().suggestionsList}>
                <div
                  onClick={() => {
                    setAllFlights(false);
                    setFlightView(
                      flightView === "Departure" ? "Return" : "Departure"
                    );
                  }}
                  className="hover:bg-black hover:text-white !text-lg"
                  style={themeHandler().suggestion}
                >
                  {flightView === "Departure" ? "Return" : "Departure"}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}
