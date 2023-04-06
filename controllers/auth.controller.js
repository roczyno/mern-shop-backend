import User from "../model/user.model.js";
import { validate } from "../validate.js";
import CryptoJS from "crypto-js";

export const register = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json("error");
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json("User with given email already exist");
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
