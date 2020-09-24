const app = require("./app");
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(
		`Server is listening @ ${PORT} and the Environment is ${process.env.NODE_ENV}`
			.blue.underline.bold
	);
});
