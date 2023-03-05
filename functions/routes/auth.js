const express = require('express');
const {signup, signin, signout, verification} = require('../controller/auth');

const {
	validateSignupRequest,
	isRequestValidated,
	validateSigninRequest,
	validateOTPRequest
} = require("../validators/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/otpvalidation", verification);
router.post("/signout", signout)

module.exports = router;