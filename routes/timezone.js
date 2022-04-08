const router = require("express").Router();

router.get("/time", function (req, res) {
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: req.body.timeZone,
  });
  res.status(200).json(nDate);
});

module.exports = router;
