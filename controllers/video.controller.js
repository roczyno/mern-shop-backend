import Videos from "../model/videos.model.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllVideos = async (req, res) => {
  const search = req.query.search;
  try {
    let videoData;
    if (search) {
      videoData = await Videos.find({
        title: { $regex: search, $options: "i" },
      });
    } else {
      videoData = await Videos.find();
    }

    res.status(200).json(videoData);
  } catch (error) {
    res.status(500).send({ message: "Internal server errors" });
    console.log(error);
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Videos.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

export const addVideos = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { path, mimetype } = req.file;
    const video = new Videos({
      title,
      desc,
      video: path,
      video_mimetype: mimetype,
    });
    await video.save();
    res.send("file uploaded successfully.");
  } catch (error) {
    res.status(400).send("Error while uploading file. Try again later.");
    console.log(error);
  }
};

export const deleteVideos = async (req, res) => {
  try {
    await Audios.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {}
};

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/videos");
  },
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    !file.originalname.match(
      /\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|mp3|wav|mp4|mov|wmv)$/
    )
  ) {
    return cb(
      new Error(
        "Only upload files with the following formats: jpg, jpeg, png, pdf, doc, docx, xslx, xls, mp3, wav, mp4,wmv, mov."
      )
    );
  }
  cb(null, true); // continue with upload
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const downloadVideo = async (req, res) => {
  try {
    const video = await Videos.findById(req.params.id);
    res.set({
      "Content-Type": video.video_mimetype,
    });

    res.sendFile(path.join(__dirname, "..", video.video));
    video.download++;
    await video.save();
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
};
