import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./utils/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
