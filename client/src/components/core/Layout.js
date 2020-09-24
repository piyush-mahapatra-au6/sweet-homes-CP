import React, { Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

//nav
import Navbar from './Navbar'
class Layout extends React.Component {
	
	isActive = (path) => {
		if (this.props.match.path === path) return { color: "#000" };
		else return { color: "#fff" };
	};

	
	render() {
		return (
			<Fragment>
				<Navbar/>
				
				
				{this.props.children}
				
			</Fragment>
		);
	}
}
export default withRouter(Layout);







// old navbar
// nav = () => {
// 	return (
		
// 			<ul className='nav nav-expand-lg navbar-light bg-primary'>
// 				<li className='nav-item'>
// 					<Link to='/' className=' nav-link' style={this.isActive("/")}>
// 						Home
// 					</Link>
// 				</li>
// 				{!isAuth() && (
// 					<Fragment>
// 						<li className='nav-item'>
// 							<Link
// 								to='/signup'
// 								className=' nav-link'
// 								style={this.isActive("/signup")}>
// 								Signup
// 							</Link>
// 						</li>
// 						<li className='nav-item'>
// 							<Link
// 								to='/signin'
// 								className='nav-link'
// 								style={this.isActive("/signin")}>
// 								Signin
// 							</Link>
// 						</li>
// 					</Fragment>
// 				)}
// 				{isAuth() && (
					
// 					<li className='nav-item'>
// 						<i className="fas fa-sign-out-alt"/>
// 						<span
// 							className='nav-link'
// 							style={{ cursor: "pointer"}}
// 							onClick={() =>
// 								signout(() => {
// 									this.props.history.push("/");
// 								})
// 							}>
								
// 							signout
// 						</span>
						
// 					</li>
// 				)}
// 			</ul>
		
// 	);
// };