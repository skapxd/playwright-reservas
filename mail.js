// @ts-check
const { createTransport } = require("nodemailer");
const { env } = require("./global");

/**
 * @param {Object} props
 * @param {string} props.email
 * @param {string} props.message
 * @param {string} [props.subject]
 */
module.exports.sendMail = async (props) => {
  const { email, message, subject = "No responder a este email" } = props;

  let transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "automail.noresponder@gmail.com",
      pass: "puhhfdrqhhefcjwj",
    },
  });

  await transporter.verify();

  if (!env.isProd) return;

  await transporter.sendMail({
    from: "automail.noresponder@gmail.com",
    to: email,
    html: message,
    subject,
  });
};
