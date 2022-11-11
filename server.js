const express = require("express");
const app = express();
const { previousLocation } = require("./functions.js");
const DATA = require("./data.json");

const getLocations = (remaining) => {
    

};

app.get("/", (req, res) => {
  const startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 19, 00, 00, 00);
  const endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 1, 07, 00, 00, 00);
  const time = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 23, 00, 00, 00);

  if (time < startTime && time > endTime) {
    return res.status(400).json({ error: [{ msg: "Santa is sleeping, please try again later" }] });
  }

  //   determine where santa was before hand
  const timeRemaining = endTime - time / 1000;

  const previousLocation = getLocations(timeRemaining);
  //   determine where santa is heading

  // get long and lat of where sants is

  res.json({ msg: previousLocation });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
