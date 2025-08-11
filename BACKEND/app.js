import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/monogo.config.js";
import short_url from "./src/routes/short_url.route.js";
import user_routes from "./src/routes/user.routes.js";
import auth_routes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// app.use(
//   cors({
//     origin: ["https://url-shortner-frontend-ruby.vercel.app"], // your React app
//     credentials: true, // 👈 this allows cookies to be sent
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",           // for local dev
  "https://url-shortner-frontend-ruby.vercel.app" // replace with your actual deployed frontend URL
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from origin ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser);

app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);

app.get("/", (req, res) => {
  res.send("Backend is running");
});


app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();  // This calls mongoose.connect internally
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running...");
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
  }
};

startServer();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// GET - Redirection
