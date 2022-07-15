import React, { useState, useEffect } from "react";
import Airport from "./airport";
import Location from "./location";
import Image from "next/image";
import far from "../media/far.svg";
import Route from "./route";
import drop from "../media/drop.svg";
import minus from "../media/minus.svg";
import { useStateContext } from "../context/context";
import themeHandler from "./theme";
import FlightSelect from "./flightSelect";
import Loading from "./loading";
import NoFound from "./noFound";
import axios from "axios";
import { useRouter } from "next/router";

export default function Details({ query }) {
  const {
    navTab,
    setFetchedAirportData,
    setFetchedLocationData,
    setFetchedRouteData,
  } = useStateContext();

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadedVal, setLoadedVal] = useState("0%");
  const [error, setError] = useState("");

  async function getResults() {
    let localLoad;
    setLoadedVal("50%");

    const { data } = await axios.post(
      `api/details?departId=${query.departId}&returnId=${query.returnId}`
    );

    if (data.error) {
      setError(`There's no information for those flight available`);
    }

    setLoadedVal("100%");
    localLoad = "100%";

    if (localLoad === "100%") {
      setTimeout(() => {
        setFetchedAirportData([data.airportDepartData, data.airportReturnData]);
        setFetchedLocationData([
          data.locationDepartData,
          data.locationReturnData,
        ]);
        setFetchedRouteData(data.routeData);
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

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center">
          <Loading loadedVal={loadedVal} title="Fetching flight data..." />
        </div>
      ) : error !== "" ? (
        <div className="w-full flex justify-center">
          <NoFound msg={error} />
        </div>
      ) : (
        <div className="w-full flex items-center flex-col">
          <div className="flex w-11/12 my-6 xl:my-12">
            <div className="flex flex-col  w-full">
              <div className="flex flex-col gap-y-8 xl:flex-row justify-between xl:items-center">
                <div className="flex flex-col order-2 xl:order-1">
                  <p className="font-cust font-[800] text-left text-4xl xl:text-5xl">
                    Flight Details
                  </p>
                  <p className="font-cust xl:inline-block hidden text-lg xl:text-xl text-left font-[400] mt-4">
                    Here is some details on your flight as <br />
                    well as the destination
                  </p>
                  <p className="font-cust xl:hidden text-lg xl:text-xl text-left font-[400] xl:mt-4 mt-2">
                    Here is some details on your flight as well as the
                    destination
                  </p>
                </div>
                <div className="relative h-fit  grid gap-y-4 order-1 lg:grid-cols-2 xl:order-2  gap-x-6 w-full  xl:w-[600px]">
                  <FlightSelect />
                  <div className="relative flex  w-full  flex items-center order-1 xl:order-2">
                    <span className="absolute z-50 left-8 rotate-180 flex">
                      <Image src={far} />
                    </span>
                    <button
                      onClick={() => router.push("/")}
                      className="text-right pr-10 text-lg w-full h-fit bg-black border-2 rounded-[4px] border-black font-cust font-[700] text-white py-[25px] md:py-[17px]"
                    >
                      Change flight
                    </button>
                  </div>
                </div>
              </div>
              <div className=" bg-[#EFEFEF] rounded-md 2xl:h-[700px] mt-8">
                {navTab === "Airport" && <Airport />}
                {navTab === "Location" && <Location />}
                {navTab === "Flight" && <Route />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
