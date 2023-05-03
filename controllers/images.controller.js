import Images from "../model/images.model.js";
export const getAllImages = async (req, res) => {
  try {
    const data = await Images.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const addImages = async (req, res) => {
  try {
    const newImage = new Images({
      title: req.body.title,
      desc: req.body.desc,
      imageUrl: req.body.imageUrl,
    });
    const savedImage = await newImage.save();
    res.status(200).json({ savedImage });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};
