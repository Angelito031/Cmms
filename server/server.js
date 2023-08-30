import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import announcementRoutes from "./routes/announcementRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";

//Dotenv config
dotenv.config();

//Setting up the app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting up the database and server
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `MongoDB is connected and Server is started at port: ${port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Server Routes
app.use("/api/announcement", announcementRoutes);
app.use("/api/subject", subjectRoutes);
