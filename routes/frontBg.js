const router = require("express").Router();
const BackgroundImg = require("../models/BackgroundImg");
const verify = require("../verifyToken");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
  Bucket: "background-img-upload",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "background-img-upload",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  }),
});

//Upload background imgs
router.post("/BackgroundImg", upload.single("bg"), async (req, res, err) => {
  try {
    const backgroundImg = await BackgroundImg.create({
      imgUrl: req.file.location,
    });

    return res.status(200).json({
      status: true,
      msg: "Successfully uploaded screen background",
      data: {
        id: backgroundImg._id,
        location: req.file.location,
      },
    });
  } catch (err) {
    return res.status(200).json({ status: false, message: err });
  }
});

// Update bg of front

router.put("/updateFrontBg", upload.single("bg"), async (req, res) => {
  const frontBgId = "627ca8de5b495563fc92bcd5";
  const frontBg = await BackgroundImg.findByIdAndUpdate(frontBgId);
  if (frontBg) {
    frontBg.imgUrl = req.file.location;
    const updatedFrontBg = await frontBg.save();
    res.status(200).json({
      status: true,
      message: "Succesfully updated!",
      data: updatedFrontBg,
    });
  }
});

// Update bg of menu

router.put("/updateMenuBg", upload.single("bg"), async (req, res) => {
  const menuBgId = "627ca92f5b495563fc92bcd7";
  const menuBg = await BackgroundImg.findByIdAndUpdate(menuBgId);
  if (menuBg) {
    menuBg.imgUrl = req.file.location;
    const updatedMenuBg = await menuBg.save();
    res.status(200).json({
      status: true,
      message: "Succesfully updated!",
      data: updatedMenuBg,
    });
  }
});

// Update bg of media

router.put("/updateMediaBg", upload.single("bg"), async (req, res) => {
  const mediaBgId = "627ca96d5b495563fc92bcd9";
  const mediaBg = await BackgroundImg.findByIdAndUpdate(mediaBgId);
  if (mediaBg) {
    mediaBg.imgUrl = req.file.location;
    const updatedMediaBg = await mediaBg.save();
    res.status(200).json({
      status: true,
      message: "Succesfully updated!",
      data: updatedMediaBg,
    });
  }
});

// Update bg of music

router.put("/updateMusicBg", upload.single("bg"), async (req, res) => {
  const musicBgId = "627ca97c5b495563fc92bcdb";
  const musicBg = await BackgroundImg.findByIdAndUpdate(musicBgId);
  if (musicBg) {
    musicBg.imgUrl = req.file.location;
    const updatedMusicBg = await musicBg.save();
    res.status(200).json({
      status: true,
      message: "Succesfully updated!",
      data: updatedMusicBg,
    });
  }
});

// Update bg of music-player

router.put("/updateMusicplayerBg", upload.single("bg"), async (req, res) => {
  const musicPBgId = "627ca98e5b495563fc92bcdd";
  const musicPBg = await BackgroundImg.findByIdAndUpdate(musicPBgId);
  if (musicPBg) {
    musicPBg.imgUrl = req.file.location;
    const updatedMusicPBg = await musicPBg.save();
    res.status(200).json({
      status: true,
      message: "Succesfully updated!",
      data: updatedMusicPBg,
    });
  }
});

// Update bg of apps

router.put("/updateAppBg", upload.single("bg"), async (req, res) => {
  const appBgId = "627ca9995b495563fc92bcdf";
  const appBg = await BackgroundImg.findByIdAndUpdate(appBgId);
  if (appBg) {
    appBg.imgUrl = req.file.location;
    const updatedAppBg = await appBg.save();
    res.status(200).json({
      status: true,
      message: "Succesfully updated!",
      data: updatedAppBg,
    });
  }
});

// Update bg of home

router.put("/updateHomeBg", upload.single("bg"), async (req, res) => {
  const homeBgId = "627ca9b25b495563fc92bce1";
  const homeBg = await BackgroundImg.findByIdAndUpdate(homeBgId);
  if (homeBg) {
    homeBg.imgUrl = req.file.location;
    const updatedHomeBg = await homeBg.save();
    res.status(200).json({
      status: true,
      message: "Succesfully updated!",
      data: updatedHomeBg,
    });
  }
});

// Update bg of myLife

router.put("/updateMyLifeBg", upload.single("bg"), async (req, res) => {
  const myLifeBgId = "6281f230fd21aa9d9e3cd1a1";
  const myLifeBg = await BackgroundImg.findByIdAndUpdate(myLifeBgId);
  if (myLifeBg) {
    myLifeBg.imgUrl = req.file.location;
    const updatedMyLifeBg = await myLifeBg.save();
    res.status(200).json({
      status: true,
      message: "Succesfully updated!",
      data: updatedMyLifeBg,
    });
  }
});

//Get bg of front

router.get("/getFrontBg", async (req, res) => {
  try {
    const frontBgId = "627ca8de5b495563fc92bcd5";
    const frontBg = await BackgroundImg.findById(frontBgId);
    res.status(200).json(frontBg);
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get bg of menu

router.get("/getMenuBg", async (req, res) => {
  try {
    const menuBgId = "627ca92f5b495563fc92bcd7";
    const menuBg = await BackgroundImg.findById(menuBgId);
    res.status(200).json(menuBg);
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get fbg of media

router.get("/getMediaBg", async (req, res) => {
  try {
    const mediaBgId = "627ca96d5b495563fc92bcd9";
    const mediaBg = await BackgroundImg.findById(mediaBgId);
    res.status(200).json(mediaBg);
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get fbg of music

router.get("/getMusicBg", async (req, res) => {
  try {
    const musicBgId = "627ca97c5b495563fc92bcdb";
    const musicBg = await BackgroundImg.findById(musicBgId);
    res.status(200).json(musicBg);
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get fbg of music-player

router.get("/getMusicPBg", async (req, res) => {
  try {
    const musicPBgId = "627ca98e5b495563fc92bcdd";
    const musicPBg = await BackgroundImg.findById(musicPBgId);
    res.status(200).json(musicPBg);
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get fbg of apps

router.get("/getAppsBg", async (req, res) => {
  try {
    const appsBgId = "627ca9995b495563fc92bcdf";
    const appBg = await BackgroundImg.findById(appsBgId);
    res.status(200).json(appBg);
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get fbg of home

router.get("/getHomeBg", async (req, res) => {
  try {
    const homeBgId = "627ca9b25b495563fc92bce1";
    const homeBg = await BackgroundImg.findById(homeBgId);
    res.status(200).json(homeBg);
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get fbg of myLife

router.get("/getMyLifeBg", async (req, res) => {
  try {
    const myLifeBgId = "6281f230fd21aa9d9e3cd1a1";
    const myLifeBg = await BackgroundImg.findById(myLifeBgId);
    res.status(200).json(myLifeBg);
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

module.exports = router;
