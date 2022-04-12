const fs = require("fs");
const router = require("express").Router();
const Timezone = require("../models/Timezone");

// Timezones List
router.get("/timezonesList", function (req, res) {
  fs.readFile("timezones.json", "utf-8", function (err, data) {
    res.status(200).json({ status: true, list: JSON.parse(data) });
  });
});

// post the timezone
router.post("/timezone", async (req, res, err) => {
  try {
    const timezone = await Timezone.create({
      timezone: req.body.timezone,
      // const nDate = new Date().toLocaleString("en-US", {
      //   //     timeZone: req.body.timeZone,
      //   timeZone: req.body.timezone,
      // })
    });
    // const ntimezone = new Date().toLocaleString("en-US", {
    //   list: Timezone.timezone,
    // });

    return res.status(200).json({
      status: true,
      data: new Date().toLocaleString("en-US", {
        data: "Asia/Magadan",
      }),
      msg: "Successfully saved",
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err });
  }
});

// set Timezone

router.get("/time", function (req, res) {
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: req.body.timeZone,
  });
  res.status(200).json({ status: true, message: "Suucessful!", data: nDate });
});

module.exports = router;
