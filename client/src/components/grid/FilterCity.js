import React, { Component } from "react";
import { FaCity } from "react-icons/fa";
import { getRoomsByCity } from "../../redux/actions/homeAction";
import { connect } from "react-redux";
import Select from "react-select";

class FilterCity extends Component {
	handleChange = (event) => {
		this.props.getRoomsByCity(event.target.value);
	};

	render() {
		return (
			<label>
				<strong>
					City
					<span>
						
						<FaCity />
					</span>
				</strong>
				:
				<select onChange={this.handleChange}>
					<option value='All'>All Cities</option>
					<option value='Mumbai'>Mumbai</option>
					<option value='Hyderabad'>Hyderabad</option>
					<option value='Delhi'>Delhi</option>
					<option value='Chennai'>Chennai</option>
					<option value='Bangalore'>Bangalore</option>
				</select>
			</label>
		);
	}
}

export default connect(null, { getRoomsByCity })(FilterCity);

// constructor(props) {
// 	super(props);
// 	this.state = { value: null };
// }

// handleChange = (event) => {
// 	this.setState({value:event.target.value});
// 	console.log(event.target.value)
// 	console.log(event.target.name)

// 	console.log(this.state.value)

// };
// handleSubmit = (event) => {
// 	event.preventDefault();
// 	this.props.getRoomsByCity(this.state.value);
// };
