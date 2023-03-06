const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");
const nodemailer = require("nodemailer");
const OTP = require("../models/otp");
require("dotenv").config();
var smtpTransport = require("nodemailer-smtp-transport");
const { parseInt } = require("lodash");
const generateJwtToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//nodemailer config
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 587,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  })
);

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Alrerady Exists",
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const hash_password = password ? await bcrypt.hashSync(password, 10) : "";
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    _user.save({ req: req.body }, (error, user) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      if (user) {
        // const token = generateJwtToken(user._id);
        // const { _id, firstName, lastName, email, fullName } = user;
        // return res.status(201).json({
        // 	token,
        // 	user: { _id, firstName, lastName, email, fullName },
        // });
        sendOTPVerification(user.email, user._id, res);
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email, req: req.body }).exec(
    async (err, user) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
      if (user) {
        let isPassword = req.body.password
          ? await bcrypt.compareSync(req.body.password, user.hash_password)
          : "";
        if (isPassword) {
          const token = generateJwtToken(user._id);
          const { _id, firstName, lastName, email, fullName } = user;
          // res.status(200).json({
          // 	token,
          // 	user: {
          // 		_id,
          // 		firstName,
          // 		lastName,
          // 		email,
          // 		fullName,
          // 	},
          // });
          sendOTPVerification(req.body.email, user._id, res);
        } else {
          return res.status(400).json({
            success: false,
            message: "Something went wrong",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
    }
  );
};

// It will clear the cookies from the browser and send a response to the client that User Signed Out
exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    req.headers["authorization"] = null;
    res.status(200).json({
      message: "User Signed Out",
    });
  } catch (err) {
    res.status(400).json({
      message: "Login Again",
    });
  }
};

exports.verification = (req, res) => {
  try {
    let id = req.body.id;
    req.body.otp = parseInt(req.body.otp);
    OTP.find({ userId: req.body.id }).exec((err, users) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong",
          status: 400,
        });
      }

        if (users[0].otp != req.body.otp) {
          return res.status(400).json({
            success: false,
            message: "Invalid OTP",
            status: 400,
          });
        }

      if (users[0]) {
        OTP.updateOne(
          { userId: req.body.id },
          { req: req.body },
          {
            $set: {
              otp: null,
            },
          }
        ).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: err.message,
              status: 400,
            });
          }

          const current = new Date().getTime();
        const expiry = users[0].expiry ? users[0].expiry.getTime() + 1000 * 60 * 5:new Date().getTime();

        if (expiry < current) {
          return res.status(400).json({
            success: false,
            message: "OTP Expired",
          });
        }

          
          if (user) {
            const token = generateJwtToken(req.body.id);
            return res.status(201).json({
              success: true,
              message: "Token Generated",
              result: [
                {
                  token,
                  user: {
                    id,
                  },
                },
              ],
            });
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP/User ",
          status: 400,
        });
      }
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Something went wrong",
      status: 400,
    });
  }
};

const sendOTPVerification = async (email, id, res) => {
  try {
    transporter.verify().then(console.log).catch(console.error);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailoptions = {
      from: `Divyanshu <${process.env.AUTH_EMAIL}>`,
      to: email,
      subject: "OTP Verification",
      text: "OTP Verification",
      html: `<h1><b>${otp}</b> is your opt for using those api's valid for an hour only.</h1>`,
    };
    OTP.findOne({ userId: id }).exec(async (err, otpObject) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong",
          status: 400,
        });
      }
      if (otpObject) {
        OTP.updateMany(
          { userId: id },
          { $set: { otp: otp, expiry: new Date() } }
        ).exec((err, otp) => {
          res.json({
            success: true,
            message: "OTP sent to your email",
            result: [{ _id: id }],
          });
        });
      } else {
        const _otp = new OTP({
          userId: id,
          otp: otp,
          expiry: new Date(),
        });
        _otp.save((error, otp) => {
          if (error) {
            return res.status(400).json({
              success: false,
              message: "Something went wrong",
            });
          }
          if (otp) {
            res.json({
              success: true,
              message: "OTP sent to your email",
              result: [{ _id: id }],
            });
          }
        });
      }
    });
    await transporter.sendMail(mailoptions);
  } catch (err) {
    res.json({
      success: false,
      message: "Something went wrong",
      status: 400,
    });
  }
};
