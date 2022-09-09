import express from "express";
import { json } from "body-parser";
import { emailRouter } from "./mail_controller";

const app = express();
app.use(json({ limit: "10mb" }));
app.use(emailRouter);

const start = async () => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT}.`);
  });
};

start();
setInterval(function() {
  app.get("https://undertherose-mailer.herokuapp.com/");
}, 300000);
