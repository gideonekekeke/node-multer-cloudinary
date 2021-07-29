const express = require("express");
const general = require("../Model/ModelSchema");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

//using our multer middleware

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageUpload = multer({ storage });

cloudinary.config({
  cloud_name: "giddy",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//getting all the files
router.get("/", async (req, res) => {
  const AllData = await general.find();
  try {
    res.status(200).json({
      message: "Succefull 💻 ",
      data: AllData,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: AllData,
    });
  }
});

//getting a files by id
router.get("/:id", async (req, res) => {
  const gettingId = await general.findById(req.params.id);
  try {
    res.status(200).json({
      message: "Succefull 💻",
      data: gettingId,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: gettingId,
    });
  }
});

router.post("/", imageUpload.single("avatar"), async (req, res) => {
  const usingCloudinary = await cloudinary.uploader.upload(req.file.path);
  console.log(usingCloudinary);
  const SendingData = await general.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    avatar: usingCloudinary.secure_url,
  });

  try {
    res.status(201).json({
      message: "Succefull 💻",
      data: SendingData,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: SendingData,
    });
  }
});

router.patch("/:id", imageUpload.single("avatar"), async (req, res) => {
  const usingCloudinary = await cloudinary.uploader.upload(req.file.path);
  console.log(usingCloudinary);
  const EditingUser = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    avatar: usingCloudinary.secure_url,
  };
  try {
    const updated = await general.findByIdAndUpdate(req.params.id, EditingUser);
    res.status(200).json({
      message: "Succefull 💻",
      data: updated,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: updated,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const deleteUser = await general.findByIdAndRemove(req.params.id, req.body);
  try {
    res.status(201).json({
      message: "Succefull 💻",
      data: deleteUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: deleteUser,
    });
  }
});

module.exports = router;
