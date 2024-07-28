import { TryCatch } from "../middlewares/error.middleware";
import { ErrorHandler } from "../utils/utility.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = TryCatch(async (req, res, next) => {
  const { fullName, email, password, role, phoneNumber } = req.body;

  if (
    [fullName, password, email, role, phoneNumber].some(
      (field) => field?.trim() === ""
    )
  ) {
    return next(new ErrorHandler("All fields are compulsory", 400));
  }

  const user = await User.findOne({
    email,
  });

  if (user) {
    return next(new ErrorHandler("User already exists with this email", 400));
  }

  const hashedPassword = bcrypt.hash(password, 10);

  await User.create({
    email,
    phoneNumber,
    fullName,
    role,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "Account created successfully.",
    success: true,
  });
});

export const login = TryCatch(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill all credentials", 400));
  }

  let user = await User.findOne({
    email,
  });

  if (!user) {
    return next(new ErrorHandler("Incorrect email", 400));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Incorrect password", 400));
  }

  if (role != user.role) {
    return next(new ErrorHandler("Incorrect role", 400));
  }

  const token = await jwt.sign(
    {
      userId: user._id,
    },
    process.env.SECRET,
    {
      expiresIn: "1d",
    }
  );

  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true,
    });
});

export const logout = TryCatch(async (req, res, next) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully.",
    success: true,
  });
});
