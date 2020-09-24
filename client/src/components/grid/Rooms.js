import React, { Component } from "react";
import Hero from "../landing/Hero";
import Banner from "../landing/Banner";
import RoomsContainer from "./RoomsContainer";
import { Link } from "react-router-dom";
import image from "../../images/work-8.jpg";
import "../../css/grid.css";
import Layout from "../core/Layout";
import '../../css/grid.css'

export default class Rooms extends Component {
	render() {
		return (
			<>
				<Layout>
					<RoomsContainer />
				</Layout>
			</>
		);
	}
}

/**
 * 
 * 					<div className=' container grid'>
						<Banner title='Browse Homes'>
							<Link to='/' className='btn-primary'>
								Welcome Page
							</Link>
						</Banner>
					</div>
 * 
 */
