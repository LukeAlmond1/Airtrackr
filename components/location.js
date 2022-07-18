import React from "react";
import Map from "./map";
import { useStateContext } from "../context/context";
import DetailNav from "./detailNav";
import { motion, AnimatePresence } from "framer-motion";

export default function Location() {
  const { fetchedLocationData, flightView } = useStateContext();
  const data =
    flightView === "Return" ? fetchedLocationData[1] : fetchedLocationData[0];

  return (
    <div className="grid 2xl:grid-cols-2  w-full gap-y-8">
      <div className="mb-16 2xl:mt-8  order-2 2xl:order-1">
        <span className="2xl:block hidden">
          <DetailNav />
        </span>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="2xl:ml-10 order-2 flex flex-col items-center 2xl:block"
          >
            <p className="font-[800] font-cust text-left w-11/12 text-black text-2xl 2xl:text-3xl 2xl:mt-12">
              {data.name}
            </p>
            <p className="font-cust text-lg 2xl:text-xl w-11/12 2xl:w-9/12 text-left font-[400] mt-4">
              {data.desc}
            </p>
            <div className="grid sm:grid-cols-2 w-11/12 2xl:w-9/12 gap-x-6 gap-y-6 mt-12">
              {data.boxes.map((e, i) => (
                <div
                  className="flex bg-black rounded-xl items-center flex-col justify-center items-center py-8 2xl:py-6"
                  key={i}
                >
                  <p className="text-white font-cust font-[700]">{e.title}</p>
                  <div className="h-0.5 w-10/12 bg-[#2F2F2F] my-2" />
                  <p className="text-white font-cust font-[700] text-xl text-center px-4">
                    {e.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-11/12 2xl:hidden h-0.5 bg-[#D7D7D7] my-12" />
            <span className="2xl:hidden 2xl:mt-12 block w-11/12">
              <DetailNav />
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="border h-96 2xl:h-[700px] relative rounded-t-lg 2xl:rounded-r-lg order-1 2xl:order-2">
        <Map lat={data.lat} lng={data.lng} zoom={12} />
      </div>
    </div>
  );
}
