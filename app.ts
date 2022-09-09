import express from "express";
import { json } from "body-parser";
import { emailRouter } from "./mail_controller";
import cors from 'cors';

const corsOptions = {
  allowedHeaders: 'Content-Type,Access-Control-Allow-Origin',
  origin: '*',
  exposedHeaders: 'Access-Control-Allow-Origin',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions))
app.use(json({ limit: "10mb" }));
app.use(emailRouter);
const PORT = process.env.PORT || 5000
const start = async () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
};

start();
// setInterval(function() {
//   app.get("https://undertherose-mailer.herokuapp.com/");
// }, 300000);
