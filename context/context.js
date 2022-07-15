import { createContext, useEffect, useState, useContext } from "react";
import date from "date-and-time";
import moment from "moment";

const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [airlines, setAirlines] = useState([]);

  const now = new Date();
  const year = moment(now).add(1, "years");
  const dayAfter = moment(now).add(1, "days");

  const [departDate, setDepartDate] = useState(now);
  const [returnDate, setReturnDate] = useState(year);
  const [error, setError] = useState("");
  const [airportFromValue, setAirportFromValue] = useState("");
  const [airportLeaveValue, setAirportLeaveValue] = useState("");
  const [airlineValue, setAirlineValue] = useState("");
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [airlineIata, setAirlineIata] = useState("");
  const [flightView, setFlightView] = useState("Departure");
  const [navTab, setNavTab] = useState("Airport");
  const [departFlightList, setDepartFlightList] = useState([null]);
  const [returnFlightList, setReturnFlightList] = useState([null]);
  const [selectedDepartFlight, setSelectedDepartFlight] = useState("");
  const [selectedReturnFlight, setSelectedReturnFlight] = useState("");

  const [fetchedAirportData, setFetchedAirportData] = useState({
    name: "Luton Aiport (LAX)",
    desc: `Gatwick Airport, also known as London Gatwick, is a major international
        airport near Crawley, West Sussex, England, 29.5 miles south of Central
        London.`,
    boxes: [
      {
        title: "Postcode / Zipcode",
        value: "United Arab Emirates",
      },
      { title: "Phone Number", value: "01582 405100" },
      { title: "Rating", value: "3.8/5" },
      { title: "Code", value: "LLND" },
    ],
    lat: 51.886,
    lng: 0.2389,
  });
  const [fetchedLocationData, setFetchedLocationData] = useState({
    name: "Manchester",
    desc: `Manchester is a major city in the northwest of England with a rich industrial heritage. The Castlefield conservation area’s 18th-century canal system recalls the city’s days as a textile powerhouse`,
    boxes: [
      { title: "Population", value: "553,230" },
      { title: "Weather", value: "17°C" },
      { title: "Language", value: "English, German, French, Polish" },
      { title: "Local Time", value: "20:33pm" },
    ],
    lat: 9.004,
    lng: 7.2578,
  });
  const [fetchedRouteData, setFetchedRouteData] = useState({
    origin: {
      lat: 38.8749,
      lng: 1.3712,
    },
    dest: {
      lat: 30.112,
      lng: 31.3964,
    },
    boxes: [
      { title: "Arrival Time", value: "13:55pm" },
      { title: "Departure Time", value: "10:35am" },
      { title: "Distance", value: "2462m" },
      { title: "Flight Time", value: "1hrs 5mins" },
      { title: "Time Until Depart", value: "14D 10mins" },
    ],
  });

  return (
    <stateContext.Provider
      value={{
        selectedDepartFlight,
        setSelectedDepartFlight,
        selectedReturnFlight,
        setSelectedReturnFlight,
        departFlightList,
        setDepartFlightList,
        returnFlightList,
        setReturnFlightList,
        departDate,
        setDepartDate,
        airportFromValue,
        setAirportFromValue,
        airportLeaveValue,
        setAirportLeaveValue,
        airlineValue,
        setAirlineValue,
        returnDate,
        setReturnDate,
        airlines,
        setAirlines,
        dayAfter,
        year,
        now,
        error,
        setError,
        origin,
        setOrigin,
        dest,
        setDest,
        airlineIata,
        setAirlineIata,
        navTab,
        setNavTab,
        fetchedAirportData,
        setFetchedAirportData,
        fetchedLocationData,
        setFetchedLocationData,
        fetchedRouteData,
        setFetchedRouteData,
        flightView,
        setFlightView,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(stateContext);
};
