const { check } = require("express-validator");

//User Signup Validator
exports.userSignupValidator = [
	check("name").not().isEmpty().withMessage("Name is Required"),
	check("email").isEmail().withMessage("Must be a valid email Address"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("password must be atleat 6 chars long"),
];

//user Signin Validator
exports.userSigninValidator = [
	check("email").isEmail().withMessage("Must be a valid email is required"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("password must be atleast 6 character long is required"),
];
exports.forgotPasswordValidator = [
	check("email")
		.not()
		.isEmpty()
		.isEmail()
		.withMessage("Must be a valid email is required"),
];

exports.resetPasswordValidator = [
	check("newPassword")
		.not()
		.isEmpty()
		.isLength({ min: 6 })
		.withMessage("Must be atleast 6 letter long "),
];
