import React from "react";
import Details from "../components/details";

export default function DetailsPage({ query }) {
  return (
    <>
      <Details query={query} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  if (!query.departId || !query.returnId || Object.keys(query).length === 0) {
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
