import User from "../model/user.model.js";
import { validate } from "../validate.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Token from "../model/token.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import passwordComplexity from "joi-password-complexity";
import joi from "joi";

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

    const token = await new Token({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const savedToken = await token.save();

    const url = `${process.env.BASE_URL}/api/auth/${savedToken.userId}/verify/${savedToken.token}`;
    await sendEmail(savedUser.email, "Verify email", url);

    res
      .status(200)
      .send({ message: "Email sent to your account please verify" });
  } catch (error) {
    res.status(500).send({ message: `internal server eror ${error}` });
    console.log(error);
  }
};

//verify token
export const verifyToken = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "no user found" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { verified: true });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
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

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        const token = new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/api/auth/${token.userId}/verify/${token.token}`;
        await sendEmail(user.email, "Verify email", url);
      }

      return res
        .status(400)
        .send({ message: "Email sent to your account please verify" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    res.status(200).json({ message: "LoggedIn successfully", accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};
// send password link
export const passwordResetLink = async (req, res) => {
  try {
    const emailSchema = joi.object({
      email: joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      res.status(409).send({ message: "User with given email not found" });
    let token = await Token.findOne({
      userId: user._id,
    });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const url = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password-Reset", url);
    res
      .status(200)
      .send({ message: "Password reset link send to your email account" });
  } catch (error) {}
};

// verify password reset link
export const verifyPasswordResetLink = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) res.status(409).send({ message: "Invalid User" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) res.status(409).send({ message: "Invalid Link" });
    res.status(200).send({ message: "Valid Url" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//  set new password
export const resetPassword = async (req, res) => {
  try {
    const passwordSchema = joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ _id: req.params.id });
    if (!user) res.status(409).send({ message: "Invalid User" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) res.status(409).send({ message: "Invalid Link" });
    if (!user.verified) user.verified = true;
    const hashedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
