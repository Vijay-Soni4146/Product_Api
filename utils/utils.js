// const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
require("dotenv").config();

const Util = class {
  static generateRandomPassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  // static generateUUID = () => {
  //   const uuid = uuidv4();
  //   console.log("Generated UUID:", uuid);
  //   return uuid;
  // };

  static generateRandomId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const timestamp = Date.now().toString();
    const randomChars = Array.from({ length: 5 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    );

    return `${timestamp}_${randomChars.join("")}`;
  };

  static getErrorMessageFromString = (message) => {
    return {
      error: message,
    };
  };

  static getErrorMessage = (mongooseException) => {
    try {
      const mainJSONKeys = Object.keys(mongooseException.errors);
      if (mongooseException.errors[mainJSONKeys[0]].errors) {
        const jsonKeys = Object.keys(
          mongooseException.errors[mainJSONKeys[0]].errors
        );
        return {
          error:
            mongooseException.errors[mainJSONKeys[0]].errors[jsonKeys[0]]
              .properties.message,
        };
      } else {
        return {
          error: mongooseException.errors[mainJSONKeys[0]].message,
        };
      }
    } catch (e) {
      return {
        error: mongooseException.message,
      };
    }
  };

  static sendMail = async (email, randomPassword, name) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Your Password for RTCompressor Login",
      html: `<p>Hello <strong>${name}</strong>,<br> Your password for RTCompressor is: <strong>${randomPassword}</strong></p>`,
    };

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
};

module.exports = Util;