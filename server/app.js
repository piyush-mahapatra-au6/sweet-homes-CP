const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors");
const colors = require("colors");
//Env Variables:
dotenv.config({ path: "./config/config.env" });

// DB connection:
connectDB();
//import Routes here
const authRouter = require("./routes/authroute");
const homeRouter = require("./routes/homeroute");
const geoRouter = require("./routes/georoute");
const razorRouter = require('./routes/razorroute')

const app = express();
//Setting up Global middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//Setup Routes here
app.use("/api", homeRouter);
app.use("/api", authRouter);
app.use("/api", geoRouter);
app.use('/api',razorRouter)
//Test Route
app.get("/", (req, res) => {
	res.status(200).json({
		msg: "Welcome to SweetHomes",
	});
});

//Handling Universal Route
app.get("*", (req, res) => {
	res.send("This route doesn't exist.404");
});

module.exports = app;
