import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: "USER ALREADY EXISTS",
        success: false,
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      message: "USER REGISTERED SUCCESSFULLY",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "ERROR IN REGISTERING USER",
      success: false,
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: "USER DOES NOT EXIST",
        success: false,
      });
    }
    // check role
    if (user.role !== req.body.role) {
      return res.status(200).send({
        message: "INVALID ROLE",
        success: false,
      });
    }
    // compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(200).send({
        message: "INVALID PASSWORD",
        success: false,
      });
    }
    // generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      message: "USER LOGGED IN SUCCESSFULLY",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "ERROR IN LOGIN USER",
      success: false,
      error,
    });
  }
};

const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      message: "USER FETCHED SUCCESSFULLY",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "ERROR IN GETTING CURRENT USER",
      success: false,
      error,
    });
  }
};

export { registerController, loginController, currentUserController };
