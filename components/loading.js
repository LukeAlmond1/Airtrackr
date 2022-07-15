import React from "react";
import { motion } from "framer-motion";

export default function Loading({ loadedVal, title }) {
  return (
    <div className="flex h-screen w-11/12 xl:w-screen items-center justify-center flex-col">
      <p className="font-cust font-[800] text-center text-4xl xl:text-5xl mt-12">
        {title}
      </p>
      <p className="font-cust md:inline-block hidden text-lg xl:text-xl text-center font-[400] mt-4">
        We are searching the best sources to find the <br /> most update to
        date information
      </p>
      <p className="font-cust md:hidden text-lg  xl:text-xl text-center font-[400] mt-4">
        We are searching the best sources to find the most update to date
        information
      </p>
      <div className="md:w-2/3 w-11/12 xl:mt-10 mt-6 h-6 bg-[#EFEFEF] rounded-full ">
        <motion.div
          className="h-6 rounded-full bg-black w-0"
          animate={{ width: loadedVal }}
          transition={{
            delay: 1,
            x: { type: "spring", stiffness: 100 },
            default: { duration: 2 },
          }}
        ></motion.div>
      </div>
    </div>
  );
}
