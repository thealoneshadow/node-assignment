const express = require('express');
const {signup, signin, signout, verification} = require('../controller/auth');

const {
	validateSignupRequest,
	isRequestValidated,
	validateSigninRequest,
	validateOTPRequest
} = require("../validators/auth");

const router = express.Router();

router.post("/signup",validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/optvalidation",validateOTPRequest,isRequestValidated, verification);
router.post("/signout", signout)

module.exports = router;