import jwt from "jsonwebtoken";
import { TryCatch } from "./error.middleware.js";
import { ErrorHandler } from "../utils/utility.js";

export const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies.token;
  console.log('l\n',  req.cookies)
  // console.log("token", token);
  

  if (!token) {
    return next(new ErrorHandler("User is not authenticated"));
  }

  const decode = await jwt.verify(token, process.env.SECRET);

  if (!decode) {
    return next(new ErrorHandler("Invalid token"));
  }

  req.id = decode.userId;
  next();
});
