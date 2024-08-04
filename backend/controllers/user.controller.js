import { TryCatch } from "../middlewares/error.middleware.js";
import { ErrorHandler } from "../utils/utility.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = TryCatch(async (req, res, next) => {
  const { fullname, email, password, role, phoneNumber } = req.body;

  if (
    [fullname, password, email, role, phoneNumber].some(
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

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    phoneNumber,
    fullname,
    role,
    password: hashedPassword,
  });

  console.log("yaha pahicha");
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

export const updateProfile = TryCatch(async (req, res, next) => {
  const { bio, skills, fullName, email, phoneNumber } = req.body;

  let skillsArray;
  if (skills) {
    skillsArray = skills.split(",");
  }
  const userId = req.id;
  let user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  if (fullName) user.fullname = fullName;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;
  if (skills) user.profile.skills = skillsArray;

  await user.save();

  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res.status(200).json({
    message: "Profile updated successfully.",
    user,
    success: true,
  });
});
