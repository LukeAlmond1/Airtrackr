import React from "react";
import { useStateContext } from "../context/context";

export default function DetailNav() {
  const { navTab, setNavTab } = useStateContext();

  const nav = [{ name: "Airport" }, { name: "Location" }, { name: "Flight" }];

  return (
    <div className="grid xl:grid-cols-3 gap-x-5 gap-y-5 2xl:px-6 w-full 2xl:w-[550px]">
      {nav.map((e, i) => (
        <div
          key={i}
          onClick={() => setNavTab(e.name)}
          className={`${
            navTab === e.name && "!bg-black !text-white"
          } 2xl:py-3 py-8 px-5 bg-[#DDDDDD] text-lg cursor-pointer text-[#B9B9B9] font-cust font-[700] flex justify-center rounded-md`}
        >
          {e.name}
        </div>
      ))}
    </div>
  );
}
