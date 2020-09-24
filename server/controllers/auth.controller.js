const User = require("../models/User");
const _=require('lodash')
const nodemailer = require("../helpers/sendEmail");
const jwt = require("jsonwebtoken");
const sendEmail = require("../helpers/sendEmail");
const gravatar = require("gravatar");
const { OAuth2Client } = require("google-auth-library");
exports.dashboard = (req, res) => {
	res.json({ msg: "helolo there" });
};

exports.signup = async (req, res) => {
	const { name, email, password, role } = req.body;
	User.findOne({ email }, (err, user) => {
		if (user) {
			return res.status(400).json({
				error: "Email is taken",
			});
		}
		const token = jwt.sign(
			{ name, email, password, role },
			process.env.JWT_SECRET,
			{
				expiresIn: "10m",
			}
		);
		const message = `Hey There! 1 Step away from SweetHomes :).${process.env.CLIENT_URL}/auth/activate/${token}. Use this to activate the Account. Nice and Easy!`;
		sendEmail({
			email: email,
			subject: "Hi This is Binod  from Sweet Homes",
			message,
		})
			.then((user) => {
				res.status(200).json({
					msg: `Please check ${email} for further Instructions`,
					user,
				});
			})
			.catch((err) => {
				res.status(400).json({ err });
			});
	});
};
exports.accountActivation = (req, res) => {
	const { token } = req.body;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				console.log(err);
				res.status(401).json({
					error: "token has expired please try again",
				});
			} else {
				const { name, email, password, role } = jwt.decode(token);
				const avatar = gravatar.url(email, {
					s: "200",
					r: "pg",
					d: "mm",
				});
				console.log(token);
				const user = new User({ name, email, avatar, password, role });
				user.save((err, user) => {
					if (err) {
						console.log("Save user in account activation error", err);
						return res.status(401).json({
							error: "Error saving user in database",
						});
					}
					return res.json({
						message: `Signup Success,Please Signin to Continue`,
						user,
					});
				});
			}
		});
	} else {
		return res.json({
			msg: `something went Wrong,Please Try Again`,
		});
	}
};
//Signin

/**
 * STEPS NEEDED TO BE FOLLOWED FOR USER SIGNIN
 * 1.  Check if user is trying to signin but havent signupd yet
 * 2. Check if password matches with hashed apssword that is saved in db
 * 3. If yes,generate a Token with Expiry (Similar method-easy-before sending email in reg)
 * 4. The token will be Sent to Client/React( we will save in local storage ,use it for Protected Routes )
 * 5. It will be used as JWT based Authentication System
 * 6.We can Allow user to acces protcted routes later if they have valid Token
 * 7. So,here JWT Token is like PASSWORD WITH EXPIRY
 * 8.In successful Signin,We will Send User Info and Valid Token
 * 9. This Token Will be sent back to Server from Client/React to access Protected Routes Later.
 */
exports.signin = (req, res) => {
	const { email, password } = req.body;
	console.log({ email });
	User.findOne({ email }, (err, user) => {
		console.log(user);
		if (err || !user) {
			return res.status(400).json({
				error: "User with that email does not exist .Please sign up",
			});
		}
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: "Email and password do not match",
			});
		}
		console.log(user);
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		const { _id, name, email, role, avatar } = user;
		return res.json({
			token,
			user: { _id, name, email, role, avatar },
		});
	});
};
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
	const { idToken } = req.body;

	client
		.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
		.then((response) => {
			console.log("google login response", response);
			const { email_verified, name, email } = response.payload;
			if (email_verified) {
				User.findOne({ email }, (err, user) => {
					if (user) {
						const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
							expiresIn: "7d",
						});
						const { _id, email, name, role } = user;
						return res.json({
							token,
							user: { _id, email, name, role },
						});
					} else {
						let password = email + process.env.JWT_SECRET;
						user = new User({ name, email, password });
						user.save((err, data) => {
							if (err) {
								console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
								return res.status(400).json({
									error: "User signup failed with googel",
								});
							}
							const token = jwt.sign(
								{ _id: data._id },
								process.env.JWT_SECRET,
								{
									expiresIn: "7d",
								}
							);
							const { _id, email, name, role } = data;
							return res.json({
								token,
								user: { _id, email, name, role },
							});
						});
					}
				});
			} else {
				return res.status(400).json({
					error: "Google login failed",
				});
			}
		});
};
exports.forgotPassword = (req,res) => {
	const { email } = req.body
	console.log(email)
	User.findOne({ email }, (err, user) => {
	  if (err || !user) {
		return res.status(400).json({
		  error: 'User with that email does not exist'
		})
	  }
	  console.log(user)
	  const token = jwt.sign({ name:user.name,password:user.password,email:user.email}, process.env.JWT_SECRET, {
		expiresIn: "10m",
	  });
	  user.updateOne({ resetPasswordLink: token }, (err, success) => {
		if (err) {
			console.log('reset password link error',err)
		  }
		})
	  const message = `Hey There please use this to reset the password.${process.env.CLIENT_URL}/auth/password/reset/${token}. Use this to reset the password `;
	  sendEmail({
		email: email,
		subject: "hi this is shaktimaan from sweet homes",
		message,
	  })
		.then((user) => {
		  res.status(200).json({
			msg: `Please check ${email} for link of reset password`,
			user,
		  });
		})
	  
		.catch((err) => {
		  res.status(400).json({ err });
		});
	  
  
	})
  }
exports.resetPassword = (req, res) => {
	const { resetPasswordLink, newPassword } = req.body
	if (resetPasswordLink) {
	  jwt.verify(resetPasswordLink, process.env.JWT_SECRET, (err, decode) => {
		if (err) {
		  return res.status(400).json({
			error:'Expired link.try again'
		  })
		}
		User.findOne({ resetPasswordLink }, (err, user) => {
		  if (err || !user) {
			return res.status(400).json({
			  error:"something went wrong"
			})
		  }
		  const updatedFields = {
			password: newPassword,
			resetPasswordLink:''
		  }
		  user = _.extend(user, updatedFields)
		  user.save((err, result) => {
			if (err) {
			  return res.status(400).json({
				error:'Error resetting the password'
			  })
			}
			return res.json({
			  message:'Great Now you can login'
			})
		  })
		})
	  })
	}
  }
