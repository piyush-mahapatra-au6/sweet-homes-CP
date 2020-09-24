import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./index.css";
// //Redux entry
// import { Provider } from "react-redux";
// import store from "./redux/store";

ReactDOM.render(

		<React.StrictMode>
			<Routes />
		</React.StrictMode>
	,
	document.getElementById("root")
);
