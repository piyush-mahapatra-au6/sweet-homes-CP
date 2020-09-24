import React, { Fragment } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import login from "../../images/svg/reset.svg";
import { Link, withRouter, Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken'
class Reset extends React.Component {
    state = {
        name:"",
        token: "",
        newPassword:""
    };
    componentDidMount() {
		let token = this.props.match.params.token;
        let { name } = jwt.decode(token);
        let t = jwt.decode(token)
        
		console.log(token, name,t);
		if (token) {
			this.setState({name: name, token: token });
		}
	}

	handleChange = (e) => {
		this.setState({newPassword:e.target.value});
	};
	handleclick = (e) => {
		e.preventDefault();
        const { newPassword,token } = this.state;
        console.log('send new password',this.state)
		axios({
			method: "PUT",
			url: `http://localhost:8000/api/reset-password`,
			data: {resetPasswordLink:token,newPassword:newPassword},
		})
			.then((response) => {
                console.log("Forgot password done please login", response);
                toast.success(response.data.message)
                this.setState({ newPassword: "", name: "" })
                this.props.history.push('/')
				//save the  response (user,token) localstorage/cookie
			
			})
			.catch((error) => {
				console.log("reset password error", error.response.data);
				toast.error(error.response.data.error);
			});
	};

	ResetForm() {
		return (
			<div className='container'>
				<form onSubmit={(e) => this.handleclick(e)}>
					<div className='form-group'>
						<label htmlFor='exampleInputPassword'>Please enter new password</label>
						<input
							onChange={this.handleChange}
							type='password'
							name='password'
							
							class='form-control'
							id='exampleInputPassword'
							placeholder='Enter Password'
						/>
					</div>
					<input type='submit'></input>
				</form>
			</div>
		);
	}

	render() {
		const { name} = this.state;
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
                        <h1 className='p-5 text-center'>hey,{name} please enter the new password</h1>
            {/* <i className="mdi fas mdi-account-circle"></i> */}
						
						{this.ResetForm()}
					</div>
					<div className='box col-lg-6 col-md-6 col-sm-6 '>
						<img src={login} />
					</div>
				</div>
			</Layout>
		);
	}
}
export default withRouter (Reset);
