import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./helpers";

function OwnerRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth() && isAuth().role === "owner" ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}
export default OwnerRoute;
