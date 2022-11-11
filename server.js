const express = require("express");
const app = express();
const DATA = require("./data.json");

const overallSeconds = (start, end) => (end - start) / 1000;

const getLocations = (start, end, remaining) => {
  const prevObj = parseInt((remaining % overallSeconds(start, end)) / DATA.length);

  return { previousLocation: DATA[prevObj], nextLocation: DATA[prevObj + 1] };
};

app.get("/", (req, res) => {
  //Get times
  const startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 19, 00, 00, 00);
  const endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 1, 07, 00, 00, 00);
  const time = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 23, 00, 00, 00);

  //   Validate Times
  if (time < startTime && time > endTime) {
    return res.status(400).json({ error: [{ msg: "Santa is sleeping, please try again later" }] });
  }

  //  find where santa is
  const timeRemaining = endTime - time / 1000;
  const locations = getLocations(startTime, endTime, timeRemaining);

  //   determine where santa is heading

  // get long and lat of where sants is

  res.json({ msg: locations });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
