import React, { Fragment, Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

import home from "../../images/svg/home.svg";

import image from "../../images/person_1.jpg";
import {
	FaAlignRight,
	FaShareSquare,
	FaUserSecret,
	FaSignInAlt,
	FaUserAstronaut,
	FaSignOutAlt,
} from "react-icons/fa";
import "../../css/navbar.css";
import { connect } from "react-redux";
//{ isActive, props, match, history }
class nav extends Component {
	state = {
		isOpen: false,
	};
	handleToggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	isActive = (path) => {
		if (this.props.match.path === path) return { color: "red" };
		else return { color: "black" };
	};

	render() {
		let content = this.props.number ? this.props.number.length : null;
		
		return (
			<nav className='navbar'>
				<Link to='/' className=' nav-link' style={this.isActive("/")}>
					<img src={home} height='55' alt=' logo' />
				</Link>

				<button type='button' className='nav-btn'>
					<FaAlignRight className='nav-icon' />
				</button>

				{!isAuth() && (
					<ul
						style={{ display: "flex", justifyContent: "space-around" }}
						className={this.state.isOpen ? "nav-links show-nav" : "navlinks"}>
						<li className='mr-3'>
							<Link to='/signup' style={this.isActive("/signup")}>
								<FaShareSquare />
								Signup
							</Link>
						</li>
						<li className='ml-3'>
							<Link to='/signin' style={this.isActive("/signin")}>
								<FaSignInAlt />
								Signin
							</Link>
						</li>
					</ul>
				)}
				{isAuth() && (
					<ul
						style={{
							display: "flex",
							justifyContent: "space-around",
							alignItems: "flex-start",
						}}
						className={this.state.isOpen ? "nav-links show-nav" : "navlinks"}>
						{isAuth().role === "owner" && (
							<li>
								<span className='nav-link'>
									<Link to='/owner-dashboard'>
										<FaUserSecret />
										Owner's Area
									</Link>
								</span>
							</li>
						)}
						{isAuth().role === "tenant" && (
							<li>
								<span className='nav-link'>
									<Link to='/tenant'>
										<FaUserAstronaut />
										Tenant's Area
									</Link>
									<span className='ml-1'>
										<strong>{content}</strong>
									</span>
								</span>
							</li>
						)}
						<li>
							<span
								className='nav-link'
								style={{ cursor: "pointer" }}
								onClick={() =>
									signout(() => {
										this.props.history.push("/");
									})
								}>
								<FaSignOutAlt />
								Signout
							</span>
						</li>
						<li className='navbar-nav ml-auto nav-flex-icons'>
							<a className='nav-link p-2' href='#'>
								<img
									src={image}
									className='rounded-circle z-depth-0'
									alt='need to fix cors  image'
									height='50'
								/>
							</a>
						</li>
					</ul>
				)}
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		number: state.getTenantRooms.payload,
	};
};

export default withRouter(connect(mapStateToProps)(nav));

// Gravatar image in navbar---> fix cors error
// const obj = JSON.parse(localStorage.getItem("user"));
// const img = `https://cors-anywhere.herokuapp.com${obj.avatar}`;

// style={{borderRadius:"50%",backgroundColor:"darkkhaki",height:"1rem",width:"1rem"}}
