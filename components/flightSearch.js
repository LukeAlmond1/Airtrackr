import React, { useEffect, useState } from "react";
import GetAirport from "../components/getAirport";
import GetAirline from "../components/getAirline";
import GetDate from "../components/getDate";
import axios from "axios";
import Image from "next/image";
import far from "../media/far.svg";
import { useStateContext } from "../context/context";
import { useRouter } from "next/router";
import moment from "moment";

export default function FlightSearch() {
  const {
    departDate,
    setDepartDate,
    returnDate,
    setReturnDate,
    airlines,
    setAirlines,
    dayAfter,
    year,
    now,
    error,
    setError,
    airportFromValue,
    setAirportFromValue,
    airportLeaveValue,
    setAirportLeaveValue,
    airlineValue,
    setAirlineValue,
    setOrigin,
    setDest,
    dest,
    origin,
    airlineIata,
  } = useStateContext();

  const router = useRouter();

  const [loading, setLoading] = useState(null);

  function handleFlightSearch() {
    setError("");
    setLoading(true);

    setTimeout(() => {
        if (new Date(departDate).getTime() > new Date(returnDate).getTime()) {
            setError("Your return flight can’t be before your depart flight");
            setLoading(false);
        }
        if (
            departDate === "" ||
            returnDate === "" ||
            airlineValue === "" ||
            airportLeaveValue === "" ||
            airportFromValue === ""
        ) {
            setError("Please fill all input fields");
            setLoading(false);
        } else if (
            new Date(departDate).getTime() < new Date(returnDate).getTime()
        ) {
            router.push(
                `/flights?departDate=${moment(new Date(departDate)).format(
                "YYYY-MM-DD"
                )}&returnDate=${moment(new Date(returnDate)).format(
                "YYYY-MM-DD"
                )}&origin=${origin}&dest=${dest}&airline=${airlineIata}`
            );
            setLoading(false);
        }
    }, 2000)

  }

  async function getAirlines() {
    const { data } = await axios.get(
      "https://api.npoint.io/f64ae76bc5304d1c4363"
    );
    setAirlines(data.filter((e) => e.iata !== "" && e.name !== ""));
  }

  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate);
    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      startDate === endDate
        ? date.setDate(date.getDate() - 1)
        : date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  const returnData = getDatesInRange(dayAfter, year);
  const departData = getDatesInRange(now, returnDate);

  useEffect(() => {
    async function getAirlinesHandler() {
      await getAirlines();
    }
    getAirlinesHandler();
  }, []);

  return (
    <div className="w-full flex justify-center mt-12 xl:mt-24 mb-24">
      <div className="w-11/12 xl:w-10/12 grid xl:grid-cols-3 bg-[#EFEFEF] gap-x-24 gap-y-8 py-12 rounded-md px-6 xl:px-10 relative">
        <GetAirport
          value={airportFromValue}
          setValue={setAirportFromValue}
          question="Where are you flying from?"
          placeholder="ie Manchester Airport"
          setQuery={setOrigin}
        />
        <GetAirport
          value={airportLeaveValue}
          setValue={setAirportLeaveValue}
          question="Where are you flying to?"
          placeholder="ie Alicante Airport"
          setQuery={setDest}
        />
        <GetAirline
          value={airlineValue}
          setValue={setAirlineValue}
          data={airlines}
          question="Who are you flying with?"
          placeholder="ie Ryanair"
        />
        <GetDate
          value={departDate}
          setValue={setDepartDate}
          question="Depart Date?"
          data={departData}
        />
        <GetDate
          value={returnDate}
          setValue={setReturnDate}
          question="Return Date?"
          data={returnData}
        />
        <div className=" w-full h-fit self-end flex justify-center flex-col relative">
          <button
            onClick={() => handleFlightSearch()}
            className="w-full text-left pl-10 text-lg h-fit bg-black border-2 rounded-[4px] border-black font-cust font-[700] text-white py-[17px]"
          >
            {loading ? "Searching flight information..." : "Discover Detail"}
          </button>
          <span className="absolute z-50 right-8">
            <Image src={far} />
          </span>
        </div>
      </div>
    </div>
  );
}
