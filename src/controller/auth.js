const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const nodemailer = require("nodemailer");
require('dotenv').config();
var smtpTransport = require('nodemailer-smtp-transport');
const generateJwtToken = (_id) => {
	return jwt.sign({ _id}, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

//nodemailer config
const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
	host: 'smtp.gmail.com',
	secure: true,
    port: 587,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    },
	tls: {
        ciphers:'SSLv3'
    }
}));


exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (err, user) => {
		if (user) {
			return res.status(400).json({
				message: "User Alrerady Exists",
			});
		}
		const { firstName, lastName, email, password } = req.body;
		const hash_password = await bcrypt.hashSync(password, 10);
		const _user = new User({
			firstName,
			lastName,
			email,
			hash_password,
			username: shortid.generate(),
		});

		_user.save((error, user) => {
			if (error) {
				return res.status(400).json({
					message: "Something went wrong",
				});
			}

			if (user) {
				// const token = generateJwtToken(user._id);
				// const { _id, firstName, lastName, email, fullName } = user;
				// return res.status(201).json({
				// 	token,
				// 	user: { _id, firstName, lastName, email, fullName },
				// });
				sendOTPVerification(user.email,user._id,res);
			}
		});
	});
}

exports.signin =async (req, res) => {
	User.findOne({ email: req.body.email }).exec(async (err, user) => {
		if (err) return res.status(400).json({ err });
		if (user) {
			const isPassword = await user.authenticate(req.body.password);
			if (isPassword) {
				// const token = generateJwtToken(user._id);
				// const { _id, firstName, lastName, email, fullName } = user;
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
			    await sendOTPVerification(req.body.email,user._id,res);
			} else {
				return res.status(400).json({
					message: "Invalid Password",
				});
			}
		} else {
			return res.status(400).json({
				message: "User does not exist",
			});
		}
	});
};


// It will clear the cookies from the browser and send a response to the client that User Signed Out
exports.signout = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({
		message: "User Signed Out",
	});
};

exports.verification = (req, res) => {
    try{
		const token = generateJwtToken(req.body._id,req.body.otp);
				return res.status(201).json({
					token,
				});
	} 
	catch(err){
		res.json({
			message: "Something went wrong",
			status: 400
		})
	}
}

const sendOTPVerification =async (email,id,res) => {
try{
	transporter.verify().then(console.log).catch(console.error);
	const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
	const mailoptions ={
		from: `Divyanshu <${process.env.AUTH_EMAIL}>`,
		to:email,
		subject: "OTP Verification",
		text:"OTP Verification",
		html: `<h1><b>${otp}</b> is your opt for using those api's valid for an hour only.</h1>`
	}
	 await transporter.sendMail(mailoptions);
	res.json({
		message: "OTP sent to your email",
		_id: id,
		status: 200,
	})
}
catch(err){
	res.json({
		message: "Something went wrong",
		status: 400
	})
}
}
