const express = require("express");
const app = express();
const DATA = require("./data.json");

const overallSeconds = (start, end) => (end - start) / 1000;

const getLocations = (start, end, remaining) => {
  const prevObj = parseInt((remaining % overallSeconds(start, end)) / DATA.length);
  return { previousLocation: DATA[prevObj], nextLocation: DATA[prevObj + 1] };
};

const deg2rad = (deg) => deg * (Math.PI / 180);

const distanceInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

app.get("/api/getSantaLocation", (req, res) => {
  //Get times
  const startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 00, 00, 00);
  const endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 22, 00, 00, 00);
  // const endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 19, 00, 00, 00);
  const time = new Date();

  //   Validate Times
  if (time < startTime || time > endTime) return res.status(400).json({ error: [{ msg: "Santa is sleeping, please try again later" }] });

  //  find where santa is
  const timeRemaining = (endTime - time) / 1000;
  const locations = getLocations(startTime, endTime, timeRemaining);

  //   determine where santa is heading
  const distance = distanceInKm(locations.previousLocation.lat, locations.previousLocation.lng, locations.nextLocation.lat, locations.nextLocation.lng).toFixed(0);

  // get long and lat of where sants is
  const secondsRemaining = timeRemaining % 136;
  const lat = locations.previousLocation.lat + (locations.nextLocation.lat - locations.previousLocation.lat) * (secondsRemaining / 136);
  const lng = locations.previousLocation.lng + (locations.nextLocation.lng - locations.previousLocation.lng) * (secondsRemaining / 136);

  res.json({ lng, lat });
});
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
