import React, { useState } from "react";
import Image from "next/image";
import Logo from "../media/logo.svg";
import far from "../media/far.svg";
import Message from "../components/message";
import { useRouter } from "next/router";
const capitalize = require("capitalize");
import { useStateContext } from "../context/context";

export default function FlightList({
  data,
  title,
  setStage,
  stage,
  setSelected,
  selected,
}) {
  const router = useRouter();
  const { selectedDepartFlight, selectedReturnFlight, error, setError } =
    useStateContext();

  const excludedFields = ["iata", "offerId", "lat", "lng"];

  function handleNext() {
    if (stage === 1) {
      if (!selectedDepartFlight) {
        setError("Please select your departure flight");
      } else {
        setStage(stage + 1);
      }
    } else {
      if (!selectedReturnFlight) {
        setError("Please select your return flight");
      } else {
        router.push(
          `/details?departId=${selectedDepartFlight.offerId}&returnId=${selectedReturnFlight.offerId}`
        );
      }
    }
  }

  return (
    <div className="flex flex-col w-11/12  items-center my-12">
      {error !== "" && <Message errorMsg={error} />}
      <p className="font-cust font-[800] w-full text-left text-3xl xl:text-5xl">
        {title}
      </p>
      <p className="font-cust xl:inline-block w-full hidden text-lg xl:text-xl text-left font-[400] mt-4">
        Select your flight from the list below <br />
        to see more details
      </p>
      <p className="font-cust xl:hidden text-lg xl:text-xl text-left font-[400] xl:mt-4 mt-2">
        Select your flight from the list below to see more details
      </p>

      <div className="flex flex-col pr-6 w-full gap-y-8 mt-8 xl:mt-12  h-[600px]  overflow-scroll xl:scrollbar-thin xl:scrollbar-thumb-black xl:scrollbar-track-custom-light xl:scrollbar-thumb-rounded-full xl:scrollbar-track-rounded-full">
        {data.map((el, i) => (
          <div
            key={i}
            onClick={() => {
              setSelected(selected === el ? "" : el);
              setError("");
            }}
            className={`${
              selected === el && "!border-black"
            } bg-[#EFEFEF] rounded-md grid gap-x-32 gap-y-12 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 lg:px-12 px-8 xl:px-16 py-10 cursor-pointer border-[3px] hover:border-[#E6E6E6] border-[#EFEFEF] border-[3px]`}
          >
            {Object.keys(el).map((key) => (
              <>
                {!excludedFields.some((e) => e === key) && (
                  <div className="flex flex-col">
                    <p className="font-cust font-[700] ml-2">
                      {capitalize(key)}
                    </p>
                    <div className="w-full border my-2 border-[#D2D2D2]" />
                    <p className="font-cust font-[700] ml-2 text-xl">
                      {capitalize(el[key])}
                    </p>
                  </div>
                )}
              </>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full md:w-fit grid gap-y-5 md:grid-cols-2 md:self-end mt-10 gap-x-4">
        <div className="relative flex items-center w-full md:w-56">
          <span className="absolute z-50 left-8 rotate-180 flex">
            <Image src={far} />
          </span>

          <button
            onClick={() => {
              stage === 1 ? router.back() : setStage(stage - 1);
            }}
            className="text-right pr-10 w-full h-fit bg-black border-2 rounded-[4px] border-black font-cust font-[800] text-white py-[25px] md:py-[17px]"
          >
            Back
          </button>
        </div>
        <div className="relative flex items-center w-full md:w-56">
          <button
            onClick={() => handleNext()}
            className="text-left pl-10 w-full h-fit bg-black border-2 rounded-[4px] border-black font-cust font-[800] text-white py-[25px] md:py-[17px]"
          >
            Next
          </button>
          <span className="absolute z-50 right-8 flex">
            <Image src={far} />
          </span>
        </div>
      </div>
    </div>
  );
}
