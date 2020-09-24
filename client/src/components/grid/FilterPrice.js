import React, { Component } from "react";
import { getRoomsByPrice } from "../../redux/actions/homeAction";
import { connect } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";

class FilterPrice extends Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };
	}

	handleChange = (event) => {
        this.setState({ value: event.target.value });
        // console.log(this.state.value);
	};
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.getRoomsByPrice(this.state.value);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					<strong>Budget<span><FaRupeeSign/></span></strong>:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value='low'> Less than Rs4000</option>
						<option value='medium'>4000 to Rs6000</option>
						<option value='high'>6000 to Rs12000 +</option>
						<option value='All'>All Budgets</option>

					</select>
				</label>
				<input type='submit' value='Submit' />
			</form>
		);
	}
}

export default connect(null, { getRoomsByPrice })(FilterPrice);
