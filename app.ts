import express from "express";
import { json } from "body-parser";
import { emailRouter } from "./mail_controller";

const app = express();
app.use(json({ limit: "10mb" }));
app.use(emailRouter);

const start = async () => {
  app.listen(3005, () => {
    console.log("Listening on port 3005.");
  });
};

start();
