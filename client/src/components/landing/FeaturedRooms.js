import React, { Component } from "react";
import Room from "./Room";
import Title from "./Title";
import "../../css/loader.css";
import {connect} from 'react-redux'
import { getFeaturedRooms } from "../../redux/actions/homeAction";

import "../../css/featuredRooms.css";
 class FeaturedRooms extends Component {

componentDidMount(){
	this.props.getFeaturedRooms()
}


	render() {
		
		let content = this.props.featuredRooms ? (
			this.props.featuredRooms.map((room, index) => (
				<Room key={index} room={room} />
			))
		) : (
			<div className='loader'> </div>
		);


		return (
			<section className='featured-rooms pt-4'>
				<Title title='Hall of Fame' />
				<div className='featured-rooms-center'>
					{content}
				</div>
			</section>
		);
	}
}

const mapStatetoProps = (state) => {
	// console.log(state)
	return {
		featuredRooms: state.featuredRooms.payload,
	};
};

export default connect(mapStatetoProps,{getFeaturedRooms})(FeaturedRooms)

