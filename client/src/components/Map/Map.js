import React from "react";
import GoogleMapReact from "google-map-react";

import santa from "../../assets/santa.png";

const Marker = () => (
  <div className="st-marker">
    <img src={santa} alt="santa" />
  </div>
);

const Map = ({ lng, lat }) => {
  const defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 3,
  };

  return (
    <div className="st-map">
      <GoogleMapReact bootstrapURLKeys={{ key: "" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
