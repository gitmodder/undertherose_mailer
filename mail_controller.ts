// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
import { google } from "googleapis";
import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json("Server is up and running.");
});

router.post("/send-email", async (req: Request, res: Response) => {
  console.log(req.body);
  const emailsent = await sendMail(req.body.email);
  if (!emailsent) {
    res.status(400).json("An Error Occurred During The Process.");
  }
  res.status(200).send(emailsent);
});

const sendMail = async (toEmail: string) => {
  try {
    const mailer = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'bottwelve@inbox.lv', // generated ethereal user
        pass: 'BDKCLdVOgPvAItwf', // generated ethereal password
      },
    });
    const mailOptions = {
      from: "bottwelve@inbox.lv",
      to: toEmail,
      subject: `Get In Touch ${toEmail}`,
      text: "The Details I Will Get Here.",
    };
    const result = await mailer.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { router as emailRouter };
