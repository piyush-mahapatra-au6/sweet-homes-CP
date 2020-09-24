import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "./helpers";
import Google from "./Google";
import login from "../../images/svg/login.svg";
class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			bottonText: "submit",
		};
	}

	informParent = (response) => {
		authenticate(response, () => {
			toast.success(`hey ${response.data.user.name},aapka swagat hai`);
		});
	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(e.target.value)
		console.log(this.state)

	};
	handleclick = (e) => {
		e.preventDefault();
		this.setState({ bottonText: "submitting" });
		const { email, password } = this.state;
		axios({
			method: "POST",
			url: `http://localhost:8000/api/signin`,
			data: { email, password },
		})
			.then((response) => {
				console.log("signup sucess", response);
				//save the  response (user,token) localstorage/cookie
				authenticate(response, () => {
					this.setState({ email: "", password: "", sucess: true });

					isAuth() && isAuth().role == "owner"
						? this.props.history.push("/owner-dashboard")
						: this.props.history.push("/");
					//  isAuth() && isAuth().role == 'tenant' ? this.props.history.push('/tenant') : this.props.history.push('/')
				});
			})
			.catch((error) => {
				console.log("signup errpr", error.response.data);
				this.setState({ name: "", email: "", password: "", sucess: false });
				toast.error(error.response.data.error);
			});
	};

	signinForm() {
		return (
			<div className='container'>
				<form onSubmit={(e) => this.handleclick(e)}>
					<div className='form-group'>
						<label htmlFor='exampleInputEmail1'>Email address</label>
						<input
							onChange={this.handleChange}
							type='email'
							name='email'
							value={this.state.email}
							class='form-control'
							id='exampleInputEmail1'
							aria-describedby='emailHelp'
							placeholder='Enter email'
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='exampleInputPassword1'>Password</label>
						<input
							onChange={this.handleChange}
							type='password'
							name='password'
							value={this.state.password}
							class='form-control'
							id='exampleInputPassword1'
							placeholder='Password'
						/>
					</div>

					<input type='submit'></input>
				</form>
			</div>
		);
	}

	render() {
		const { email, password } = this.state;

		return (
			<Layout>
				<ToastContainer />

				<div className='container'>
					<div
						className='row box cred-box'
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "70vh",
						}}>
						<div className='col-lg-6 col-md-6 col-sm-6'>
							<h1 className='p-5 text-center'>Login</h1>
							<Google informParent={this.informParent} />
							{this.signinForm()}
							<Link to='forgot' className='badge badge-warning'>
								Forgot password
							</Link>
						</div>
						<div className='box col-lg-6 col-md-6 col-sm-6 '>
							<img src={login} />
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
export default Signin;
