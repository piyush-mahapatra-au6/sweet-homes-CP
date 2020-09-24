
import React, { Component } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getRoomsByZipcodeRadius } from "../../redux/actions/homeAction";
import { connect } from "react-redux";

class FilterZipcodeAndRadius extends Component {
	constructor(props) {
		super(props);
		this.state = { zipcode: 0,distance:0};
	}

	handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.value)
        console.log(this.state)

	};
	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state)
		 this.props.getRoomsByZipcodeRadius(this.state);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<span><FaMapMarkerAlt/></span>
				<label>
					<strong>Zipcode </strong>:
					<input name='zipcode' onChange={this.handleChange} value={this.state.zipcode}/>
				</label>
				<label>
					<strong>Distance</strong>:
					<select name="distance" value={this.state.distance} onChange={this.handleChange}>
	
						<option value='100'>-</option>
						<option value='150'>150</option>
						<option value='200'>200</option>
						<option value='250'>250</option>
						<option value='300'>300</option>




					</select>
				</label>

				<input type='submit' value='Submit' />
			</form>
		);
	}
}

export default connect(null,{getRoomsByZipcodeRadius})(FilterZipcodeAndRadius)