import Videos from "../model/videos.model.js";
export const getAllVideos = async (req, res) => {
  try {
    const data = await Videos.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const addVideo = async (req, res) => {
  try {
    const newVideo = new Videos({
      title: req.body.title,
      desc: req.body.desc,
      imageUrl: req.body.imageUrl,
      video: req.body.video,
    });
    const savedVideo = await newVideo.save();
    res.status(200).json({ savedVideo });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};
