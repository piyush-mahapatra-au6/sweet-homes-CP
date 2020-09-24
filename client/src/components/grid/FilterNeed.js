
import React, { Component } from "react";
import { FaSmile } from "react-icons/fa";
import { getRoomsByNeed } from "../../redux/actions/homeAction";
import { connect } from "react-redux";

class FilterNeed extends Component {
	constructor(props) {
		super(props);
		this.state = { wifi: "yes",mess:'yes',pets:'yes' };
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state)
		 this.props.getRoomsByNeed(this.state);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<span><FaSmile/></span>
				<label>
					<strong>Wifi </strong>:
					<select name="wifi"value={this.state.value} onChange={this.handleChange}>
	
						<option value='yes'>yes</option>
						<option value='no'>no</option>


					</select>
				</label>
				<label>
					<strong>Mess</strong>:
					<select name="mess"value={this.state.value} onChange={this.handleChange}>
	
						<option value='yes'>yes</option>
						<option value='no'>no</option>


					</select>
				</label>
				<label>
					<strong>Pets</strong>:
					<select name="pets" value={this.state.value} onChange={this.handleChange}>
	
						<option value='yes'>yes</option>
						<option value='no'>no</option>


					</select>
				</label>

				<input type='submit' value='Submit' />
			</form>
		);
	}
}

export default connect(null,{getRoomsByNeed})(FilterNeed)