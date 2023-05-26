import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { recipient, subject, message, downloadLink } = req.body;

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
    subject: subject,
    html: `
    <h3>Download Link</h3>
    <p>Click the link below to download the file:</p>
    <a href="${downloadLink} download">Download</a>
    <h3>Message</h3>
    <p>${message}</p>
  `,
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
