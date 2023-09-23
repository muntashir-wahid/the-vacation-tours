const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "vacation-tours@admin.com",
    to: options.email,
    subject: "Reset your password",
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
