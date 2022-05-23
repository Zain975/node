const fs = require("fs");
const router = require("express").Router();
const Timezone = require("../models/Timezone");

// Timezones List
router.get("/timezonesList", async (req, res) => {
  const timezoneId = "6254f31e9e582738652ae484";
  const timezone = await Timezone.findById(timezoneId);
  fs.readFile("timezone.json", "utf-8", function (err, data) {
    res.status(200).json({
      status: true,
      timezone: timezone.timezone,
      list: JSON.parse(data),
    });
  });
});

// post the timezone in DB
router.post("/timezone", async (req, res, err) => {
  try {
    const timezone = await Timezone.create({
      timezone: req.body.timezone,
    });
    return res.status(200).json({
      status: true,
      message: "Successfully saved",
      data: timezone.timezone,
    });
  } catch (err) {
    return res.status(200).json({ status: false, message: err });
  }
});

// Update Timezone

router.put("/updateTimezone", async (req, res) => {
  const timezoneId = "6255ae485cf0cc88db8d8c40";
  const timezone = await Timezone.findByIdAndUpdate(timezoneId);
  if (timezone) {
    timezone.timezone = req.body.timezone;
    const updatedTimezone = await timezone.save();
    res
      .status(200)
      .json({ status: true, message: "Successfully updated!", data: timezone });
  }
});

// get Timezone

router.get("/time", async (req, res) => {
  const timezoneId = "6255ae485cf0cc88db8d8c40";
  const timezone = await Timezone.findById(timezoneId);
  if (!timezone.timezone) {
    res.status(404).json("Timezone is missing");
  } else {
    const nDate = new Date().toLocaleString("en-US", {
      timezone: timezone.timezone,
    });
    // const t = setInterval(toLocaleString(), 1000);

    res.status(200).json({
      status: true,
      message: "Suucessful!",
      // data: t,
      data: nDate,
    });
  }
});

module.exports = router;
