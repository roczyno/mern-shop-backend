import express from "express";
import nodemailer from "nodemailer";
import path from "path";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { recipient, subject, message, attachment } = req.body;

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
    from: process.env.USER,
    to: recipient,
    subject: subject,
    attachments: [
      {
        filename: path.basename(attachment), // Use the base name of the attachment as the filename
        path: attachment, // Set the path of the attachment
      },
    ],
    message: message,
    html: `<p><em>Hello there!!
    thanks for letting us serve you
   
   If you didn't request for this, please ignore this message. Someone may have used your email address by mistake, and no further action is required.
   
   If you have any questions or need assistance with your account, please contact our support team at adiabajacob9@gmail.com
   
   Thank you for choosing us. We look forward to serving you!
   
   Best regards,</em>
   </p>`,
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
