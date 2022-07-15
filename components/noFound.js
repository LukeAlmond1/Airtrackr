import React from "react";
import Image from "next/image";
import fnd from "../media/fnd.svg";
import nofnd from "../media/nofnd.svg";
import far from "../media/far.svg";
import { useRouter } from "next/router";

export default function NoFound({ msg }) {
  const router = useRouter();

  return (
    <div className="relative flex h-fit my-12 md:pb-0 w-11/12 xl:w-screen justify-center md:justify-start flex-col items-center">
      <p className="font-cust font-[800] text-center text-4xl xl:text-5xl ">
        {msg}
      </p>
      <p className="font-cust md:inline-block hidden text-lg xl:text-xl text-center font-[400] mt-4">
        {`It looks like we've haven't been able to find flight`} <br /> {`infomation
        for you`}
      </p>
      <p className="font-cust md:hidden text-lg  xl:text-xl text-center font-[400] mt-4">
        {`It looks like we've haven't been able to find flight infomation for you`}
      </p>
      <span className="mt-36 hidden md:flex">
        <Image src={nofnd} />
      </span>
      <div className="md:w-fit w-full gap-x-8 grid justify-items-center gap-y-4 mt-12 md:mt-24">
        <div className="relative flex items-center  w-full md:w-64 ">
          <span className="absolute z-50 left-8 rotate-180 flex">
            <Image src={far} />
          </span>
          <button
            onClick={() => router.push("/")}
            className="text-right pr-10 text-lg w-full h-fit bg-black border-2 rounded-[4px] border-black font-cust font-[800] text-white py-[25px] md:py-[17px]"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
