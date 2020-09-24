import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from "jsonwebtoken";

class Activate extends React.Component {
	state = {
		name: "",
		token: "",
		show: true,
	};
	componentDidMount() {
		let token = this.props.match.params.token;
		let { name } = jwt.decode(token);
		console.log(token, name);
		if (token) {
			this.setState({ name: name, token: token });
		}
	}
	clickSubmit = (e) => {
		const { token } = this.state;
		axios({
			method: "POST",
			url: `http://localhost:8000/api/activate`,
			data: { token },
		})
			.then((response) => {
				console.log("Account ACTIVATION", response);
				this.setState({ sucess: true, show: false });
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log("signup errpr", error.response.data);
				toast.error(error.response.data.error);
			});
	};
	activateLink = () => {
		const { name } = this.state;
		return (
			<div>
				<h1 className='p-5 text-center'>
					hey,{name},Ready to activate the account
				</h1>
				<button className='btn btn-outline-primary' onClick={this.clickSubmit}>
					Activate Account
				</button>
			</div>
		);
	};

	render() {
		const { name, token, show } = this.state;

		return (
			<Layout>
				<div className='container'>
					<ToastContainer />
					<h1>Activate link</h1>
					{this.activateLink()}
				</div>
			</Layout>
		);
	}
}
export default Activate;

//{JSON.stringify({ name, token, show })}
