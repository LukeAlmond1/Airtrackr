import React from "react";
import Image from "next/image";
import error from "../media/error.svg";

export default function Message({ errorMsg }) {
  return (
    <div className="absolute w-full flex justify-center z-50 ">
      <div className="rounded-md bg-red-100 w-10/12 py-8 flex justify-center">
        <div className="flex items-center">
          <span className="flex mr-2">
            <Image src={error} />
          </span>
          <p className="font-cust font-[700] text-red-700 xl:text-lg">
            {errorMsg}
          </p>
        </div>
      </div>
    </div>
  );
}
