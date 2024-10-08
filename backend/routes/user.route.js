import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/authenticated.middleware.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/register").post(multerUpload.single("file"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/profile/update")
  .post(isAuthenticated, multerUpload.single("file"), updateProfile);

export default router;
