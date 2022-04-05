const router = require("express").Router();
const Audio = require("../models/Audio");
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
  Bucket: "mp3-file-upload",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "mp3-file-upload",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // cb(null, `audio${Date.now()}.mp3`);
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
    // fileFilter(req, file, cb) {
    //   if (!file.originalname.match(/\.(flac|m4a|wav|wma|aac|mp3)$/)) {
    //     return cb(new Error("only upload files with audio format."));
    //   }
    //   cb(undefined, true); // continue with upload
    // },
  }),
});

//Uploading single File to aws s3 bucket
router.post("/audio", upload.single("audio"), async (req, res, err) => {
  try {
    const audio = await Audio.create({
      title: req.body.title,
      audioUrl: req.file.location,
    });

    return res.status(200).json({
      data: req.file,
      msg: "Successfully uploaded audio file",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// //get all audio file

router.get("/audiolist", async (req, res) => {
  try {
    const audio = await Audio.find();
    res.status(200).json(audio.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("The audio has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
