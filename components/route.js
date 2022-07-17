import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import DetailNav from "./detailNav";
import Map from "./map";
import { useStateContext } from "../context/context";
import { Polyline } from "@react-google-maps/api";

export default function Route() {
  const { fetchedRouteData, flightView } = useStateContext();

  const apiKey = "AIzaSyAJchZBF9LcOcEzOD78-WQHz8vmmfb1H68";
  const [directionResponse, setDirectionResponse] = useState("");

  const path = [
    { lat: fetchedRouteData.origin.lat, lng: fetchedRouteData.origin.lng },
    { lat: fetchedRouteData.dest.lat, lng: fetchedRouteData.dest.lng },
  ];

  const options = {
    strokeColor: "black",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "black",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ],
    zIndex: 1,
  };

  return (
    <div className="mb-16 2xl:mt-8">
      <span className="2xl:block hidden">
        <DetailNav />
      </span>{" "}
      <div className="h-[430px] w-full border 2xl:mt-8 rounded-t-lg 2xl:rounded-auto">
        <Map
          path={path}
          options={options}
          isPoly
          lat={fetchedRouteData.origin.lat}
          lng={fetchedRouteData.origin.lng}
          originLat={fetchedRouteData.origin.lat}
          originLng={fetchedRouteData.origin.lng}
          destLat={fetchedRouteData.dest.lat}
          destLng={fetchedRouteData.dest.lng}
          zoom={6}
        />
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full items-center flex flex-col"
        >
          <div className="grid xl:grid-cols-5 2xl:px-6 mt-8 gap-x-6 gap-y-3 2xl:mt-4 w-11/12 2xl:w-full">
            {fetchedRouteData.boxes.map((e, i) => (
              <div
                className="flex bg-black rounded-xl items-center flex-col justify-center items-center py-8 2xl:py-6"
                key={i}
              >
                <p className="text-white font-cust font-[700]">{e.title}</p>
                <div className="h-0.5 w-10/12 bg-[#2F2F2F] my-2" />
                <p className="text-white font-cust font-[700] text-xl text-center px-4">
                  {flightView === "Return" && Array.isArray(e.value)
                    ? e.value[1]
                    : flightView === "Departure" && Array.isArray(e.value)
                    ? e.value[0]
                    : !Array.isArray(e.value)
                    ? e.value
                    : ""}
                </p>
              </div>
            ))}
          </div>
          <div className="w-11/12 2xl:hidden h-0.5 bg-[#D7D7D7] my-12" />

          <span className="2xl:hidden block w-11/12">
            <DetailNav />
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
