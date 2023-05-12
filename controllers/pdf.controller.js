import Pdf from "../model/pdf.model.js";
export const getAllPdf = async (req, res) => {
  try {
    const data = await Pdf.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const addPdf = async (req, res) => {
  try {
    const newPdf = new Pdf({
      title: req.body.title,
      desc: req.body.desc,
      imageUrl: req.body.imageUrl,
      file: req.body.file,
    });
    const savedPdf = await newPdf.save();
    res.status(200).json({ savedPdf });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};
