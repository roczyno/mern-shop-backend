import Audios from "../model/audios.model.js";
export const getAllAudio = async (req, res) => {
  try {
    const data = await Audios.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const addAudio = async (req, res) => {
  try {
    const newAudio = new Audios({
      title: req.body.title,
      desc: req.body.desc,
      imageUrl: req.body.imageUrl,
      audio: req.body.audio,
    });
    const savedAudio = await newAudio.save();
    res.status(200).json({ savedAudio });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};
