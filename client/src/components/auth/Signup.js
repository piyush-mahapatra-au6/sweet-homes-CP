import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth } from "./helpers";
import auth from "../../images/svg/auth.svg";
class Signup extends React.Component {
  state = {
    name: "",
    password: "",
    role: "",
    buttonText: "submit",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleclick = (e) => {
    e.preventDefault();
    this.setState({ buttonText: "SUBMITTED!" });
    const { name, email, password, role } = this.state;
    axios({
      method: "POST",
      url: `http://localhost:8000/api/signup`,
      data: { name, email, password, role },
    })
      .then((response) => {
        console.log("signup sucess", response);
        toast.success(response.data.msg);
        this.setState({
          name: "",
          role: "",
          email: "",
          password: "",
          sucess: true,
        });
      })
      .catch((error) => {
        console.log("signup error", error.response.data);
        this.setState({ name: "", email: "", password: "", sucess: false });
        toast.error(error.response.data.error);
      });
  };

  signupForm() {
    return (
      <div>
        <form onSubmit={(e) => this.handleclick(e)}>
          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              value={this.state.name}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={this.handleChange}
              type="email"
              name="email"
              value={this.state.email}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              value={this.state.password}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">
              Are you a owner or tenant? type service for Service Providers
            </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="role"
              value={this.state.role}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="owner or tenant or service"
            />
          </div>

          <input
            name="submit"
            value={this.state.buttonText}
            type="submit"
          ></input>
        </form>
      </div>
    );
  }

  render() {
    const { name, email, password } = this.state;

    return (
      <Layout>
        <ToastContainer />

        <div className="container">
          <div
            className="row box cred-box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <div className="col-lg-6 col-md-6 col-sm-6">
              <h1 className="p-5 text-center">Register Here </h1>
              {this.signupForm()}
            </div>
            <div className="box col-lg-6 col-md-6 col-sm-6 ">
              <img src={auth} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Signup;

// {/* <div>
// <Layout />
// <ToastContainer />
// {isAuth()? <Redirect to="/"/> :null}
// // {/* {JSON.stringify({ name, email, password })} */}
// // <h1>signup</h1>

// // {this.signupForm()}
// // </div> */}
