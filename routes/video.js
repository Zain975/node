const router = require("express").Router();
const Video = require("../models/Video");
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
router.post("/video", upload.single("video"), async (req, res, err) => {
  try {
    const video = await Video.create({
      title: req.body.title,
      videoUrl: req.file.location,
    });

    return res.status(200).json({
      status: true,
      // data: req.file,
      msg: "Successfully uploaded video file",
      data: {
        id: video._id,
        title: video.title,
        location: req.file.location,
      },
    });
  } catch (err) {
    return res.status(200).json({ status: false, message: err });
  }
});

// //get all video file

router.get("/videolist", async (req, res) => {
  try {
    const video = await Video.find();
    res.status(200).json({
      status: true,
      message: "List generated successfully!",
      data: video.reverse(),
    });
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

// //get all video file

router.get("/videolistt", async (req, res) => {
  try {
    const video = await Video.find();
    res.status(200).json(video.reverse());
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

//Get Single Video File

router.get("/findVideo/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json({ status: true, message: "Success", data: video });
  } catch (err) {
    res.status(200).json({ status: false, message: err });
  }
});

// Search Video

router.get("/searchVideo", (req, res, next) => {
  const searchField = req.query.title;
  Video.find({ title: { $regex: searchField, $options: "$i" } }).then(
    (data) => {
      // res.send(data);
      res
        .status(200)
        .json({ status: true, message: "Search item find", data: data });
    }
  );
});

// DELETE Video

router.delete("/deleteVideo/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ status: true, message: "The video has been deleted..." });
  } catch (err) {
    res.status(200).json(err);
  }
});

// Update Video

router.put("/updateVideo/:id", async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id);
  if (video) {
    video.title = req.body.title;
    const updatedVideo = await video.save();
    res
      .status(200)
      .json({ status: true, message: "Succesfully updated!", data: video });
  }
});

// //UPDATE

// router.put("/:id", verify, async (req, res) => {
//   if (req.user.isAdmin) {
//     try {
//       const updatedVideo = await Video.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedVideo);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You are not allowed!");
//   }
// });

module.exports = router;
