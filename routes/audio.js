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
      // cb(null, `${new Date().getTime()}_${file.originalname}`);
      cb(null, `${file.originalname}`);
    },
    // fileFilter(req, file, cb) {
    //   if (!file.originalname.match(/\.(flac|m4a|wav|wma|aac|mp3)$/)) {
    //     return cb(new Error("only upload files with audio format."));
    //   }
    //   cb(undefined, true); // continue with upload
    // },
  }),
});

const deleteFromAWS = function (key) {
  s3.deleteObject(
    {
      Bucket: "mp3-file-upload",
      Key: `${key}`,
    },
    (err, data) => {
      console.log(err);
      console.log(data);
    }
  );
};

// s3.deleteObject(
//   {
//     Bucket: "mp3-file-upload",
//     Key: "1649057723171_Heer Raanjhana - Bachchhan Paandey 128 Kbps.mp3",
//   },
//   (err, data) => {
//     console.error(err);
//     console.log(data);
//   }
// );

//Uploading single File to aws s3 bucket
router.post("/audio", upload.single("audio"), async (req, res, err) => {
  try {
    const audio = await Audio.create({
      title: req.body.title,
      audioUrl: req.file.location,
    });

    return res.status(200).json({
      status: true,
      msg: "Successfully uploaded audio file",
      data: {
        id: audio._id,
        title: audio.title,
        location: req.file.location,
      },
    });
  } catch (err) {
    return res.status(200).json({ status: false, message: err });
  }
});

// //get all audio file

router.get("/audiolist", async (req, res) => {
  try {
    const audio = await Audio.find();
    res.status(200).json({
      status: true,
      message: "List generated successfully!",
      data: audio.reverse(),
    });
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//get all audio file for web

router.get("/audiolistt", async (req, res) => {
  try {
    const audio = await Audio.find();
    res.status(200).json(audio.reverse());
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get Single Audio

router.get("/findAudio/:id", async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    res.status(200).json({ status: true, messsage: "Success", data: audio });
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

// Search Audio

router.get("/searchAudio", (req, res, next) => {
  const searchField = req.query.title;
  Audio.find({ title: { $regex: searchField, $options: "$i" } }).then(
    (data) => {
      res
        .status(200)
        .json({ status: true, message: "Search item find", data: data });
    }
  );
});

// DELETE Audio

router.delete("/deleteAudio/:id", async (req, res) => {
  try {
    const audio = await Audio.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: true, message: "The audio has been deleted..." });
  } catch (err) {
    res.status(200).json(err);
  }
});

// Update Audio

router.put("/updateAudio/:id", async (req, res) => {
  const audio = await Audio.findByIdAndUpdate(req.params.id);
  if (audio) {
    audio.title = req.body.title;
    const updatedAudio = await audio.save();
    res
      .status(200)
      .json({ status: true, message: "Succesfully updated!", data: audio });
  }
});

module.exports = router;
