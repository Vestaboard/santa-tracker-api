import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Container from "./components/Container/Container";

const App = () => {
  const [latlng, setLatlng] = useState({ lat: 0, lng: 0, error: null });

  const getData = async () => {
    try {
      const res = await axios.get("/api/getSantaLocation");
      setLatlng({ lat: res.data.lat, lng: res.data.lng, error: null });
    } catch (err) {
      console.log(err.response.data.error[0].msg);
      setLatlng({ lat: 0, lng: 0, error: err.response.data.error[0].msg });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  setTimeout(function () {
    getData();
  }, 1000);

  return (
    <div className="st-background">
      <div className="st-overlay" />
      <Container>
        <Header />
        <Button onClick={getData} />
        {latlng.error ? (
          <>
            <h2>{latlng.error}</h2>
          </>
        ) : (
          <Map {...latlng} />
        )}
      </Container>
    </div>
  );
};

export default App;
