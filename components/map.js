import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Polyline,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";

function Map({
  lat,
  lng,
  isPoly,
  options,
  path,
  zoom,
  originLat,
  originLng,
  destLat,
  destLng,
}) {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapStyles = [
    {
      featureType: "landscape.man_made",
      elementType: "geometry",
      stylers: [
        {
          color: "#f7f1df",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#d0e3b4",
        },
      ],
    },
    {
      featureType: "landscape.natural.terrain",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.medical",
      elementType: "geometry",
      stylers: [
        {
          color: "#fbd3da",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#bde6ab",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffe15f",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#efd151",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "black",
        },
      ],
    },
    {
      featureType: "transit.station.airport",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "CHANGE COLOR",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#a2daf2",
        },
      ],
    },
  ];

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey, // ,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={zoom}
          options={{ disableDefaultUI: true, styles: mapStyles }}
        >
          {isLoaded && (
            <>
              {isPoly && (
                <>
                  <Polyline path={path} options={options} />
                  <Marker position={{ lat: originLat, lng: originLng }} />
                  <Marker position={{ lat: destLat, lng: destLng }} />
                </>
              )}
              {!isPoly && <Marker position={{ lat, lng }} />}
            </>
          )}
        </GoogleMap>
      )}
    </>
  );
}

export default React.memo(Map);
