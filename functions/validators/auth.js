const { check, validationResult,matchedData } = require("express-validator");
exports.validateSignupRequest = [
	check("firstName").notEmpty().withMessage("First name is required"),
	check("lastName").notEmpty().withMessage("Last name is required"),
	check("email").isEmail().withMessage("Email is required"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

exports.validateSigninRequest = [
	check("email").isEmail().withMessage("Email is required"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

exports.validateOTPRequest = [
	check("otp").notEmpty().isNumeric().withMessage("Valid 4digit is required"),
	check("id").notEmpty().withMessage("User id Required"),
];

exports.isRequestValidated = (req, res, next) => {
	const keys1 = Object.keys(req.body);
	const keys2 = Object.keys(matchedData(req));
	const errors = validationResult(req);
	if (errors.array().length > 0) {
		return res.status(400).json({
			errors: errors.array()[0].msg,
		});
	}else if (keys1.length !== keys2.length) {
		return res.status(400).json({
		  errors: "Invalid /Extra Keys Passed",
		});
	  }
	next();
};