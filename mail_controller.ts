const nodemailer = require("nodemailer");
import { google } from "googleapis";
import express, { Request, Response } from "express";
const router = express.Router();

const CLIENT_ID =
  "467488087687-i8tbtqficd6ipgj5uqkajo9iovrhd0l9.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04hQzD0F1wtbBCgYIARAAGAQSNwF-L9IrRCM_Hc5xnY18Ps7vjgeaR6WdTcdl_Z2oc3vt0rxlTfKoKHQilrY0ynbE4-ES8hlyjto";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

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
    const accessToken = oAuth2Client.getAccessToken();
    const mailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "talhamuneerearning@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "talhamuneerearning@gmail.com",
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
