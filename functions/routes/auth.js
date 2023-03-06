const express = require('express');
const {signup, signin, signout, verification} = require('../controller/auth');

const {
	  validateSignUp,
	  validateOTP,
	  validateSignIn,
} = require("../Global Functions/Auth");
const router = express.Router();

router.post("/signup",validateSignUp, signup);
router.post("/signin",validateSignIn, signin);
router.post("/otpvalidation",validateOTP, verification);
router.post("/signout", signout)

module.exports = router;