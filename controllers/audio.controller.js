import Audios from "../model/audios.model.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllAudios = async (req, res) => {
  const search = req.query.search;
  try {
    let audioData;
    if (search) {
      audioData = await Audios.find({
        title: { $regex: search, $options: "i" },
      });
    } else {
      audioData = await Audios.find();
    }

    res.status(200).json(audioData);
  } catch (error) {
    res.status(500).send({ message: "Internal server errors" });
    console.log(error);
  }
};

export const getAudio = async (req, res) => {
  try {
    const audio = await Audios.findById(req.params.id);
    res.status(200).json(audio);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

export const addAudios = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { path, mimetype } = req.file;
    const video = new Audios({
      title,
      desc,
      audio: path,
      audio_mimetype: mimetype,
    });
    await video.save();
    res.send("file uploaded successfully.");
  } catch (error) {
    res.status(400).send("Error while uploading file. Try again later.");
    console.log(error);
  }
};

export const deleteAudio = async (req, res) => {
  try {
    await Audios.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {}
};

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/audios");
  },
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp3|wav)$/)) {
    return cb(
      new Error("Only upload audio files with the following formats: mp3, wav.")
    );
  }
  cb(null, true); // continue with upload
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const downloadAudio = async (req, res) => {
  try {
    const audio = await Audios.findById(req.params.id);
    res.set({
      "Content-Type": audio.audio_mimetype,
    });

    res.sendFile(path.join(__dirname, "..", audio.audio));
    audio.download++;
    await audio.save();
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
    console.log(error);
  }
};
