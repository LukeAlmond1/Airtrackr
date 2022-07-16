import React, { useState, useEffect } from "react";
import axios from "axios";
import FlightList from "./flightList";
import Loading from "./loading";
import Found from "../components/found";
import NoFound from "../components/noFound";
import { useStateContext } from "../context/context";

export default function Flights({ query }) {
  const {
    departFlightList,
    setDepartFlightList,
    returnFlightList,
    setReturnFlightList,
    selectedDepartFlight,
    setSelectedDepartFlight,
    selectedReturnFlight,
    setSelectedReturnFlight,
  } = useStateContext();

  const [dataFoundMsg, setDataFoundMsg] = useState("");
  const [dataFoundNum, setDataFoundNum] = useState(0);
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedVal, setLoadedVal] = useState("0%");

  async function getResults() {
    let localLoad;
    setLoadedVal("50%");

    const res = await axios.post(`api/offers?airline=${query.airline}`, {
      origin: query.origin,
      dest: query.dest,
      departDate: query.departDate,
      returnDate: query.returnDate,
    });

    setLoadedVal("100%");
    localLoad = "100%";

    const { returnArray, departArray, error } = res.data;

    if (localLoad === "100%" && error) {
      setTimeout(() => {
        setDataFoundMsg(`Ahh, we couldn't find any flights for those routes`);
        setLoading(false);
      }, 5000);
    }

    if (localLoad === "100%" && !error) {
      setTimeout(() => {
        if (departArray.length > 0 && returnArray.length > 0) {
          setDataFoundMsg("Hurrah, we’ve found");
          setDataFoundNum(departArray.length + returnArray.length);
          setDepartFlightList(departArray);
          setReturnFlightList(returnArray);
          setStage(1);
        } else {
          setDataFoundMsg(
            `Ahh, we couldn't find any ${
              departArray.length === 0
                ? "departure"
                : returnArray.length === 0
                ? "return"
                : ""
            } flights for those dates`
          );
        }
        setLoading(false);
      }, 5000);
    }
  }

  useEffect(() => {
    async function getResultshandler() {
      await getResults();
    }
    getResultshandler();
  }, []);

  const showList = departFlightList !== null && dataFoundMsg === "";

  return (
    <div className="flex items-center flex-col">
      {showList && stage === 1 && (
        <FlightList
          data={departFlightList}
          setStage={setStage}
          stage={stage}
          selected={selectedDepartFlight}
          setSelected={setSelectedDepartFlight}
          title=" Step #1 Select your departure flight..."
        />
      )}
      {showList && stage === 2 && (
        <FlightList
          data={returnFlightList}
          setStage={setStage}
          stage={stage}
          selected={selectedReturnFlight}
          setSelected={setSelectedReturnFlight}
          title="Step #2 Select your return flight..."
        />
      )}
      {loading && (
        <Loading loadedVal={loadedVal} title="Searching flight details..." />
      )}
      {dataFoundMsg.startsWith("H") && (
        <Found
          msg={dataFoundMsg}
          setDataFoundMsg={setDataFoundMsg}
          numOfFlights={dataFoundNum}
        />
      )}
      {dataFoundMsg.startsWith("A") && <NoFound msg={dataFoundMsg} />}
    </div>
  );
}
