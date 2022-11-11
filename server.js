const express = require("express");
const app = express();

const DATA = require("./data.json");

app.get("/", (req, res) => {
  const startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 19, 00, 00, 00);
  const endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 07, 00, 00, 00);
  const time = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 24, 00, 00, 00);

  // get the time
  //   const time = new Date().toLocaleTimeString();

  if (startTime < time && endTime > time) {
    return res.status(400).json({ error: [{ msg: "Santa is sleeping, please try again later" }] });
  }

  //   determine where santa was before hand
  //   console.log(endTime, time);
  const beforeLocation = (Math.abs(new Date(endTime) - new Date(time)) / (1000 * 60)) % 60;
  console.log(beforeLocation);
  //   determine where santa is heading

  // get long and lat of where sants is

  res.json({ msg: "" });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
