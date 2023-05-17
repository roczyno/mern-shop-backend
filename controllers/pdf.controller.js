import Pdf from "../model/pdf.model.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllPdf = async (req, res) => {
  const search = req.query.search;
  try {
    let pdfData;
    if (search) {
      pdfData = await Pdf.find({
        title: { $regex: search, $options: "i" },
      });
    } else {
      pdfData = await Pdf.find();
    }

    res.status(200).json(pdfData);
  } catch (error) {
    res.status(500).send({ message: "Internal server errors" });
    console.log(error);
  }
};

export const getPdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    res.status(200).json(pdf);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

export const addPdf = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { path, mimetype } = req.file;
    const pdf = new Pdf({
      title,
      desc,
      file: path,
      file_mimetype: mimetype,
    });
    await pdf.save();
    res.send("file uploaded successfully.");
  } catch (error) {
    res.status(400).send("Error while uploading file. Try again later.");
    console.log(error);
  }
};

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/pdf");
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

export const downloadPdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    res.set({
      "Content-Type": pdf.file_mimetype,
    });

    res.sendFile(path.join(__dirname, "..", pdf.file));
    pdf.download++;
    await pdf.save();
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
};
