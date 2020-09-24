import React, { Fragment } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import login from "../../images/svg/login.svg";
class Forgot extends React.Component {
	state = {
		email: "",
	
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleclick = (e) => {
		e.preventDefault();
        const { email } = this.state;
        console.log('send request',this.state)
		axios({
			method: "PUT",
			url: `http://localhost:8000/api/forgot-password`,
			data: { email},
		})
			.then((response) => {
                console.log("Forgot password send", response);
                toast.success(response.data.msg)
                this.setState({...email,email:""})
				//save the  response (user,token) localstorage/cookie
			
			})
			.catch((error) => {
				console.log("Forgot password error", error.response.data);
				this.setState({email: "",sucess: false });
				toast.error(error.response.data.error);
			});
	};

	ForgotForm() {
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
					<input type='submit'></input>
				</form>
			</div>
		);
	}

	render() {
		const { email} = this.state;

		return (
			<Layout>
				<ToastContainer />
				{/* {JSON.stringify(localStorage.getItem("user"))} */}

				<div
					className='row box cred-box'
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "70vh",
					}}>
					<div className='col-lg-6 col-md-6 col-sm-6'>
						<h1 className='p-5 text-center'>Forgot Password</h1>
            {/* <i className="mdi fas mdi-account-circle"></i> */}
						
						{this.ForgotForm()}
					</div>
					<div className='box col-lg-6 col-md-6 col-sm-6 '>
						<img src={login} />
					</div>
				</div>
			</Layout>
		);
	}
}
export default Forgot;
