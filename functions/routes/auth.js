const express = require('express');
const {signup, signin, signout, verification} = require('../controller/auth');

const {
	  validateSignUp,
	  validateOTP,
	  validateSignIn,
} = require("../utility/Auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/otpvalidation",verification);
router.post("/signout", signout)

module.exports = router;