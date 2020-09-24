import React, { Component } from "react";
import defaultImg from "../../images/work-1.jpg";
export default class Roomdetailimage extends Component {
	render() {
		return (
			<div className='detail-image'>
				<img
					src={this.props.url || defaultImg}
					class='img-fluid'
					alt="Home's image"
				/>
			</div>
		);
	}
}
