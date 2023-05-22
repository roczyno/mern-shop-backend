import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { recipient, subject, message, attachmentUrl } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configuration options for your email provider
    // ...host: process.env.HOST,
    service: process.env.SERVICE,
    port: process.env.EMAIL_PORT,
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  // Prepare email message
  const mailOptions = {
    from: process.env.User,
    to: recipient,
    subject,
    text: message,
    attachments: [
      {
        filename: "attachment_filename",
        path: attachmentUrl,
      },
    ],
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    // Email sent successfully
    res.sendStatus(200);
  } catch (error) {
    // Handle error
    res.sendStatus(500);
  }
});

export default router;
