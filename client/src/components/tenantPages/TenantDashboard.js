import React, { Component } from "react";
import { connect } from "react-redux";
import { getTenantRooms } from "../../redux/actions/homeAction";
import Layout from "../core/Layout";
import "../../css/loader.css";
import Title from "../landing/Title";
import RoomCard from "./RoomCard";
import { Link } from "react-router-dom";
import TenantBookedRooms from "./TenantBookedRooms";
import '../../css/tenantdashboard.css'

class TenantDashboard extends Component {
	constructor() {
		super();
		const user = JSON.parse(localStorage.getItem("user"));
		this.state = {
			name: user.name,
			id: user._id,
			email: user.email,
		};
	}
	componentDidMount() {
		this.props.getTenantRooms(this.state);
		// console.log(this.state);
	}

	handleUpdate = () => {
		window.location.reload(false);
	};

	render() {
		// console.log(this.props.tenantRooms, "tenant data");

		let content = this.props.tenantRooms ? (
			this.props.tenantRooms.map((home, index) => (
				<RoomCard key={index} home={home} />
			))
		) : (
			<div className='loader'></div>
		);
		return (
			<Layout>
				<Title title={`Welcome,Mr ${this.state.name}`} />
				<div className="btn btn-primary"><Link to="/rooms">BROWSE ROOMS</Link></div>
				<button
					className='btn btn-primary'
					type='button'
					value='VIEW MY HOMES'
					name='view'
					onClick={this.handleUpdate}>
					CHECK FOR UPDATES
				</button>
				<div className="row">
					<div className="col">
					<p>
					
					<strong>MY WISHLIST ROOMS</strong>
				</p>
				<section className='roomslist'>
					<div className='roomslist-center'>{content}</div>
				</section>
					</div>
					<div className="col">
						<strong>YOUR PAYMENT DETAILS</strong>
						<TenantBookedRooms/>
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tenantRooms: state.getTenantRooms.payload,
	};
};
export default connect(mapStateToProps, { getTenantRooms })(TenantDashboard);

/* /**
 * 			<div className='owner-dashboard'>
				<input type='button'  value="CREATE HOMES" name='create' onChange={this.handleCreate}/>
					
				
				<input type='button'  value="UPDATE/DELETE MY HOMES" name='update' onChange={this.handleUpdate}/>
					
				
				<input type='button' value="VIEW MY HOMES" name='view' onChange={this.handleView}/>
					
				
			</div>
 */

// onClick={() => {
// 	window.location.reload(false);
// }}
// className='btn btn-primary'>
// I'm Feeling Lucky
