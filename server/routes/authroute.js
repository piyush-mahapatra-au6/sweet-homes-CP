const express = require("express");
const router = express.Router();

//controller
const {
	signup,
	accountActivation,
	signin,
	googleLogin,
	forgotPassword,
	resetPassword,
} = require("../controllers/auth.controller.js");

//validators
const {
	userSignupValidator,
	userSigninValidator,
	forgotPasswordValidator,
	resetPasswordValidator,
} = require("../utils/auth.validator");
const { runValidation } = require("../utils/index.validator");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.post("/activate", accountActivation);
router.post("/google-login", googleLogin);
router.put("/forgot-password", forgotPasswordValidator,runValidation ,forgotPassword);
router.put("/reset-password",resetPasswordValidator,runValidation,resetPassword)

module.exports = router;
