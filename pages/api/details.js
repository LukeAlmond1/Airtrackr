import axios from "axios";
import moment from "moment";
const lookup = require("country-code-lookup");
import millify from "millify";

async function getBodyData(flightId) {
  const offer = await axios({
    method: "GET",
    url: `https://api.duffel.com/air/offers/${flightId}`,
    headers: {
      Authorization: "Bearer " + process.env.DUFFLE_KEY,
      "Duffel-Version": "beta",
    },
  });

  const { origin, duration, destination } = offer.data.data.slices[0];
  const { distance } = offer.data.data.slices[0].segments[0];
  const originTimes = offer.data.data.slices[0].segments[0];

  return {
    departAirportCountry: origin.iata_country_code,
    departAirportCity: origin.city_name,
    departAirportName: origin.name,
    departIataCode: origin.iata_code,
    departLat: origin.latitude,
    departLng: origin.longitude,
    originDepartTime: moment(
      new Date(originTimes.departing_at),
      "HH:mm"
    ).format("hh:mma"),
    originArriveTime: moment(new Date(originTimes.arriving_at), "HH:mm").format(
      "hh:mma"
    ),
    distance: distance !== null ? `${Math.round(distance)}km` : "N/A",
    duration: duration.replace("PT", "").split("H").join("Hrs ").toLowerCase(),
    rawOriginDepartTime: originTimes.departing_at,
    //Return
    returnAirportCountry: destination.iata_country_code,
    returnAirportCity: destination.city_name,
    returnAirportName: destination.name,
    returnIataCode: destination.iata_code,
    returnLat: destination.latitude,
    returnLng: destination.longitude,
  };
}

function calculateTimeUntil(time) {
  const now = moment(Date.now());
  const flightStart = moment(time);

  const formula = (time) => flightStart.diff(now, time);

  const days = formula("days");
  const daysAsMins = formula("days") * 24 * 60;
  const mins = formula("minutes");
  const minsToHours = parseFloat((mins - daysAsMins) / 60).toFixed(1) * 1;
  const formattedTimeUntil = `${days}D ${minsToHours}Hrs`;

  return formattedTimeUntil;
}

async function getRouteTimes(flightId) {
  const offer = await axios({
    method: "GET",
    url: `https://api.duffel.com/air/offers/${flightId}`,
    headers: {
      Authorization: "Bearer " + process.env.DUFFLE_KEY,
      "Duffel-Version": "beta",
    },
  });

  const { departing_at, arriving_at } = offer.data.data.slices[0].segments[0];

  return {
    destDepartTime: moment(new Date(departing_at), "HH:mm").format("hh:mma"),
    destArriveTime: moment(new Date(arriving_at), "HH:mm").format("hh:mma"),
    rawDestDepartTime: departing_at,
  };
}

async function getPlaceId(place, Gkey, latBias, lngBias) {
  //HAVE TO PASS IN A LAT & LNG FOR IP BIASING
  const getPlaceId = await axios.get(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&key=${Gkey}&type=Places&locationbias=point:${latBias},${lngBias}`
  );

  return getPlaceId.data.candidates[0];
}

async function getPlaceInfo(place_id, Gkey) {
  const getPlaceInfo = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?key=${Gkey}&place_id=${place_id}`
  );

  const { address_components, name, formatted_phone_number, rating, geometry } =
    getPlaceInfo.data.result;

  const { lat, lng } = getPlaceInfo.data.result.geometry.location;
  const { long_name } = address_components[address_components.length - 1];

  return {
    name,
    formatted_phone_number,
    rating,
    geometry,
    lat,
    lng,
    long_name,
  };
}

async function getPlaceDescription(place, Gkey) {
  const getPlaceDescription = await axios.get(
    `https://kgsearch.googleapis.com/v1/entities:search?query=${place}&key=${Gkey}&limit=1&indent=True&types=Place`
  );
  const { articleBody } =
    getPlaceDescription.data.itemListElement[0].result.detailedDescription;

  const { name } = getPlaceDescription.data.itemListElement[0].result;

  return { articleBody, name };
}

async function getCountry(country) {
  const getCountry = await axios.get(
    `https://restcountries.com/v3.1/name/${country}`
  );

  const { population, area, languages } = getCountry.data[0];

  return { population, area, languages };
}

async function getCityPop(city) {
  const key = process.env.CITY_KEY;

  const cityPop = await axios.get(
    `https://api.api-ninjas.com/v1/city?name=${city}`,
    { headers: { "X-Api-Key": key } }
  );

  const { population } = cityPop.data[0];
  return { population };
}

async function getWeather(lat, lng) {
  const key = process.env.WEATHER_KEY;
  const weatherData = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lng}`
  );

  const { temp_c } = weatherData.data.current;
  const { localtime } = weatherData.data.location;

  const time = localtime.split(" ")[1];

  return {
    temperature: `${temp_c}°C`,
    localtime: moment(time, "HH:mm").format("hh:mma"),
  };
}

async function getAirportData(
  airportData,
  Gkey,
  place,
  iataCode,
  latBias,
  lngBias
) {
  try {
    const { place_id } = await getPlaceId(
      encodeURIComponent(place),
      Gkey,
      latBias,
      lngBias
    );
    const { long_name, name, formatted_phone_number, rating, geometry } =
      await getPlaceInfo(place_id, Gkey);
    const { articleBody } = await getPlaceDescription(
      encodeURIComponent(place),
      Gkey
    );

    Object.assign(airportData, {
      name,
      desc: articleBody,
      boxes: [
        { title: "Postcode / Zipcode", value: long_name },
        { title: "Phone Number", value: formatted_phone_number },
        { title: "Rating", value: `${rating}/5` },
        { title: "Code", value: iataCode },
      ],
      lat: geometry.location.lat,
      lng: geometry.location.lng,
    });
    return airportData;
  } catch (e) {
    console.log(e.message);
  }
}

async function getLocationData(
  locationData,
  Gkey,
  country,
  city,
  latBias,
  lngBias
) {
  const { place_id } = await getPlaceId(
    encodeURIComponent(city),
    Gkey,
    latBias,
    lngBias
  );
  const { lat, lng } = await getPlaceInfo(place_id, Gkey);
  const { articleBody, name } = await getPlaceDescription(
    encodeURIComponent(city),
    Gkey
  );

  const { languages } = await getCountry(
    encodeURIComponent(lookup.byIso(country).country)
  );
  const { population } = await getCityPop(city);
  const { temperature, localtime } = await getWeather(lat, lng);

  Object.assign(locationData, {
    name,
    desc: articleBody,
    boxes: [
      {
        title: "Population",
        value: millify(population, {
          precision: 2,
          lowercase: true,
        }),
      },
      { title: "Language", value: Object.values(languages) },
      {
        title: "Local Time",
        value: localtime,
      },
      {
        title: "Weather",
        value: temperature,
      },
    ],
    lat,
    lng,
  });

  return locationData;
}

async function handleFlight(
  Gkey,
  airportArray,
  locationArray,
  airportCountry,
  airportCity,
  airportName,
  iataCode,
  latBias,
  lngBias
) {
  await getAirportData(
    airportArray,
    Gkey,
    airportName,
    iataCode,
    latBias,
    lngBias
  );
  await getLocationData(
    locationArray,
    Gkey,
    airportCountry,
    airportCity,
    latBias,
    lngBias
  );

  return { locationArray, airportArray };
}

async function handleRoute(departId, returnId, routeData) {
  const {
    departLat,
    rawOriginDepartTime,
    departLng,
    distance,
    duration,
    returnLat,
    returnLng,
    originDepartTime,
    originArriveTime,
  } = await getBodyData(departId);

  const { destDepartTime, destArriveTime, rawDestDepartTime } =
    await getRouteTimes(returnId);

  const timeUntilDepart = calculateTimeUntil(rawOriginDepartTime);
  const timeUntilReturn = calculateTimeUntil(rawDestDepartTime);

  Object.assign(routeData, {
    origin: {
      lat: departLat,
      lng: departLng,
    },
    dest: {
      lat: returnLat,
      lng: returnLng,
    },
    boxes: [
      { title: "Arrival Time", value: [originDepartTime, destDepartTime] },
      { title: "Departure Time", value: [originArriveTime, destArriveTime] },
      { title: "Distance", value: distance },
      { title: "Flight Time", value: duration },
      { title: "Time Until Depart", value: [timeUntilDepart, timeUntilReturn] },
    ],
  });

  return routeData;
}

export default async function handler(req, res) {
  try {
    setTimeout(() => {
      res.json({ error: true, msg: "Request timed out" });
    }, 10000);

    let airportDepartData = {};
    let locationDepartData = {};
    let airportReturnData = {};
    let locationReturnData = {};
    let routeData = {};

    const { departId, returnId } = req.query;
    const Gkey = process.env.GOOGLE_KEY;

    const {
      departAirportCountry,
      departAirportCity,
      departAirportName,
      departIataCode,
      returnAirportCountry,
      returnAirportCity,
      returnAirportName,
      returnIataCode,
      departLat,
      departLng,
      returnLat,
      returnLng,
    } = await getBodyData(departId);

    await handleRoute(departId, returnId, routeData);

    await handleFlight(
      Gkey,
      airportDepartData,
      locationDepartData,
      departAirportCountry,
      departAirportCity,
      departAirportName,
      departIataCode,
      departLat,
      departLng
    );

    await handleFlight(
      Gkey,
      airportReturnData,
      locationReturnData,
      returnAirportCountry,
      returnAirportCity,
      returnAirportName,
      returnIataCode,
      returnLat,
      returnLng
    );

    if (
      Object.keys(airportDepartData).length === 0 ||
      Object.keys(locationDepartData).length === 0 ||
      Object.keys(airportReturnData).length === 0 ||
      Object.keys(locationReturnData).length === 0 ||
      Object.keys(locationReturnData).length === 0
    ) {
      console.log({ error: true, msg: "Missing object" });
      res.json({ error: true, msg: "Missing object" });
    } else {
      res.json({
        airportDepartData,
        locationDepartData,
        airportReturnData,
        locationReturnData,
        routeData,
      });
    }
  } catch (error) {
    res.json({ error: true, msg: error.message });
  }
}
