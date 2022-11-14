import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Container from "./components/Container/Container";

const App = () => {
  const [latlng, setLatlng] = useState({ lat: 0, lng: 0 });

  const getData = async () => {
    const res = await axios.get("/api/getSantaLocation");
    setLatlng({ lat: res.data.lat, lng: res.data.lng });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="st-background">
      <Container>
        <Header />
        <Button onClick={getData} />
        <Map {...latlng} />
      </Container>
    </div>
  );
};

export default App;
