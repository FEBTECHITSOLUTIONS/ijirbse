import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: true,
  debug: true,
});

/**
 * Sends an email with retry logic.
 * Retries up to 5 times with exponential backoff delays (1s, 2s, 4s, 8s, 16s).
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const info = await transporter.sendMail({
        from: `"Journal" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });

      console.log(`✅ Email sent successfully to ${to} (Message ID: ${info.messageId})`);
      return info;
    } catch (error) {
      attempt++;
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);

      if (attempt >= maxRetries) {
        console.error(`🚨 All ${maxRetries} attempts failed to send email to ${to}`);
        throw new Error(`Email delivery failed after ${maxRetries} attempts: ${error.message}`);
      }

      // Exponential backoff delay before retrying
      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s, 8s, 16s
      console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default sendEmail;
