import Images from "../model/images.model.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllImages = async (req, res) => {
  const search = req.query.search;
  try {
    let imageData;
    if (search) {
      imageData = await Images.find({
        title: { $regex: search, $options: "i" },
      });
    } else {
      imageData = await Images.find();
    }

    res.status(200).json(imageData);
  } catch (error) {
    res.status(500).send({ message: "Internal server errors" });
    console.log(error);
  }
};

export const getImage = async (req, res) => {
  try {
    const image = await Images.findById(req.params.id);
    res.status(200).json(image);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

export const addImages = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { path, mimetype } = req.file;
    const image = new Images({
      title,
      desc,
      imageUrl: path,
      image_mimetype: mimetype,
    });
    await image.save();
    res.send("file uploaded successfully.");
  } catch (error) {
    res.status(400).send("Error while uploading file. Try again later.");
    console.log(error);
  }
};

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/images");
  },
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
    return cb(
      new Error(
        "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
      )
    );
  }
  cb(undefined, true); // continue with upload
};
export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const downloadImage = async (req, res) => {
  try {
    const image = await Images.findById(req.params.id);
    res.set({
      "Content-Type": image.image_mimetype,
    });

    res.sendFile(path.join(__dirname, "..", image.imageUrl));
    image.download++;
    await image.save();
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
};
