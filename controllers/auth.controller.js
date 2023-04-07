import User from "../model/user.model.js";
import { validate } from "../validate.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exist" });
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

    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json({ message: "wrong credentials" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ message: "LoggedIn successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
