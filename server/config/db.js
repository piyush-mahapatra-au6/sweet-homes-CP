const mongoose = require("mongoose");

const connectDB = async () => {
	const connection = await mongoose.connect(process.env.CLOUD_MONGO, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});

	console.log(
		`mongoose connected ${connection.connection.host}`.magenta.underline.bold
	);
};

module.exports = connectDB;
