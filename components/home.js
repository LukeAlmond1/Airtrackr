import React, { useState } from "react";
import Image from "next/Image";
import Logo from "../media/logo.svg";
import f1 from "../media/f1.svg";
import f2 from "../media/f2.svg";
import f3 from "../media/f3.svg";
import f4 from "../media/f4.svg";
import ill from "../media/ill.svg";
import smill from "../media/smill.svg";
import mill from "../media/mill.svg";
import FlightSearch from "../components/flightSearch";
import Message from "../components/message";
import { useStateContext } from "../context/context";

export default function HomePage() {
  const features = [
    { text: "1000s Tracked Flights", icon: f1, w: "w-72" },
    { text: "Latest Updates", icon: f2, w: "w-56" },
    { text: "Airport Information", icon: f3, w: "w-72" },
    { text: "Weather Details", icon: f4, w: "w-56" },
  ];

  const { error, setError } = useStateContext();

  return (
    <div>
      {error !== "" && <Message errorMsg={error} />}
      <div className="w-full">
        <span className="flex ml-12 mt-9">
          <Image src={Logo} />
        </span>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-11/12 2xl:w-10/12 grid lg:grid-cols-2 gap-x-12 mt-16 justify-center ">
          <div className="lg:order-1 order-2">
            <p className="font-cust font-[800] lg:text-left text-center text-5xl lg:text-6xl w-full mt-12">
              Find travel details for your flight!
            </p>
            <p className="font-cust text-lg lg:text-xl lg:text-left text-center font-[400] mt-4 xl:mt-6">
              Get the lastest information for your flights & flight locations
            </p>
            <div className="grid  sm:grid-cols-2 sm:w-fit gap-y-4  gap-x-4  mt-6">
              {features.map((el, i) => (
                <div
                  className={`flex py-4 px-4 w-full lg:${el.w} border-2 items-center rounded-md border-black`}
                  key={i}
                >
                  <span className="mr-2 flex">
                    <Image src={el.icon} />
                  </span>
                  <p className="font-cust font-[800] text-lg">{el.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:order-2 order-1 flex justify-center xl:justify-end">
            <span className="hidden xl:flex">
              <Image src={ill} />
            </span>
            <span className="md:flex hidden xl:hidden">
              <Image src={mill} />
            </span>
            <span className="flex md:hidden">
              <Image src={smill} />
            </span>
          </div>
        </div>
      </div>
      <FlightSearch />
    </div>
  );
}
