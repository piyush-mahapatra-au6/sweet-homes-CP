import React from "react";
import { Link } from "react-router-dom";
import "../../css/room.css";
import defaultImg from "../../images/work-1.jpg";
import { FaRupeeSign, FaTh, FaCity, FaUsers } from "react-icons/fa";
import { removeTenantRooms } from "../../redux/actions/homeAction";
import { connect } from "react-redux";
class RoomCard extends React.Component {
	constructor(props) {
		super(props);
		this.user = JSON.parse(localStorage.getItem("user"));
		this.state = {
			id: this.props.home._id,
			email: this.user.email,
		};
	}

	handleClick = () => {
		// this.props.removeTenantRooms()

		this.props.removeTenantRooms(this.state);
	};
	render() {
		const { home } = this.props;
		return (
			<>
				<article className='room'>
					<div className='img-container'>
						<img src={home.imageUrl || defaultImg} />
						<div className='price-top'>
							<h6>
								<FaRupeeSign />
								{home.price}
							</h6>
							<p>per month</p>
						</div>
						<Link
							to={{
								pathname: `/rooms/${home._id}`,

								state: {
									home: home._id,
								},
							}}
							className='btn-primary room-link'>
							More Info
						</Link>
					</div>
					<p className='room-info'>
						<strong className='s-text'>{home.title}</strong>
						<br />
						<span>
							<FaCity /> City:
						</span>
						{home.location.city}
						<br />
						<span>
							<FaTh /> Capacity:
						</span>
						{home.capacity}
						<br />
						<span>
							<FaUsers /> Size:
						</span>
						{home.size}
						<br />
						<span>
							<FaUsers /> Wifi:
						</span>
						{home.wifi}
						<br />
						<span>
							<FaUsers /> Mess:
						</span>
						{home.mess}
						<br />
						<span>
							<FaUsers /> Status:
						</span>
						{home.status}
						<br />
						<span>
							<FaUsers /> Advance:
						</span>
						{home.advance}
						
						
					</p>
					<button className='btn btn-primary' onClick={this.handleClick}>
						REMOVE
					</button>
				</article>
			</>
		);
	}
}

export default connect(null, { removeTenantRooms })(RoomCard);
