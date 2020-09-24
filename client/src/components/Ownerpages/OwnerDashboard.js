import React, { Component } from "react";
import { connect } from "react-redux";
import {getHomesByChart} from '../../redux/actions/homeAction'
import Layout from "../core/Layout";
import Chart from '../chartJS/Chart'
import '../../css/loader.css'
 class OwnerDashboard extends Component {

constructor(){
	
	super()
	const user = JSON.parse(localStorage.getItem("user"))
	this.state={
		name:user.name,
		id:user._id
	}
}
componentDidMount(){
	this.props.getHomesByChart(this.state.id)
}
	handleCreate = () => {
		this.props.history.push("/owner");
	};
	handleView = () => {
		this.props.history.push("/owner/homes");
	};
	handleMove = () => {
		this.props.history.push("/rooms");
	};


	render() {
		return (
			<Layout>
				<div className='owner-dashboard'>
				<h1>Welcome {this.state.name}</h1>
				<button
				className="btn btn-primary"
					type='button'
					value='CREATE HOMES'
					name='create'
					onClick={this.handleCreate}>
					CREATE HOMES
				</button>
				<button
				className="btn btn-primary"
					type='button'
					value='VIEW MY HOMES'
					name='view'
					onClick={this.handleView}>
					VIEW MY HOMES
				</button>
				<button
				className="btn btn-primary"
					type='button'
					value='VIEW MY HOMES'
					name='view'
					onClick={this.handleMove}>
					BROWSE ALL HOMES
				</button>
			</div>
			<div className="owner-chart">
				<Chart/>
			</div>
			</Layout>
		);
	}
}


export default connect( null,{getHomesByChart})(OwnerDashboard)

/**
 * 			<div className='owner-dashboard'>
				<input type='button'  value="CREATE HOMES" name='create' onChange={this.handleCreate}/>
					
				
				<input type='button'  value="UPDATE/DELETE MY HOMES" name='update' onChange={this.handleUpdate}/>
					
				
				<input type='button' value="VIEW MY HOMES" name='view' onChange={this.handleView}/>
					
				
			</div>
 */
