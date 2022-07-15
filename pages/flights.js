import React from "react";
import Flights from "../components/flights";

export default function FlightsPages({ query }) {
  return (
    <>
      <Flights query={query} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  if (
    !query.dest ||
    !query.origin ||
    !query.airline ||
    !query.departDate ||
    !query.returnDate ||
    Object.keys(query).length === 0
  ) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  } else {
    return {
      props: { query },
    };
  }
}
