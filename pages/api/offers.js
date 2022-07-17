import axios from "axios";
const date = require("date-and-time");

function bodySetter(origin, destination, departure_date) {
  const body = {
    data: {
      slices: [
        {
          origin,
          destination,
          departure_date,
        },
      ],
      passengers: [
        {
          family_name: "Earhart",
          given_name: "Amelia",
          type: "adult",
        },
      ],
      max_connections: 0,
    },
  };

  return body;
}

async function GetData(origin, dest, dateVal, airline, array) {
  try {
    const offer = await axios({
      method: "POST",
      url: "https://api.duffel.com/air/offer_requests",
      data: bodySetter(origin, dest, dateVal),
      headers: {
        Authorization: "Bearer " + process.env.DUFFLE_KEY,
        "Duffel-Version": "beta",
      },
    });

    offer.data.data.offers.map((e) => {
      array.push({
        airline: e.owner.name,
        offerId: e.id,
        iata: e.owner.iata_code,
        lat: e.slices[0].segments[0].origin.latitude,
        lng: e.slices[0].segments[0].origin.longitude,
        airport: e.slices[0].segments[0].origin.name,
        date: date.format(
          new Date(e.slices[0].segments[0].departing_at),
          "YYYY/MM/DD"
        ),
        time: date
          .format(new Date(e.slices[0].segments[0].departing_at), "HH:mmA")
          .toLowerCase(),
      });
    });

    array = array.filter((e) => e.iata === airline);
    return array;
  } catch (error) {
    console.log(error.message);
  }
}

export default async function handler(req, res) {
  const departData = await GetData(
    req.body.origin,
    req.body.dest,
    req.body.departDate,
    req.query.airline,
    []
  );

  const returnData = await GetData(
    req.body.dest,
    req.body.origin,
    req.body.returnDate,
    req.query.airline,
    []
  );

  res.json({
    departArray: departData,
    returnArray: returnData,
  });
}
