import React from "react";
import { Link } from "react-router-dom";
import "../../css/room.css";
import defaultImg from "../../images/work-1.jpg";
import { FaRupeeSign,FaTh,FaCity,FaUsers} from "react-icons/fa";

const Room = ({ room }) => {
// console.log(room)
	return (
		<>
			<article className='room'>
				<div className='img-container'>
					<img src={room.imageUrl || defaultImg} />
					<div className='price-top'>
						<h6><FaRupeeSign/>{room.price}</h6>
						<p>per month</p>
					</div>
					<Link
						to={{
							pathname: `/rooms/${room._id}`,

							state: {
								room: room._id,
							},
						}}
						className='btn-primary room-link'>
						More Info
					</Link>
				</div>
				<p className='room-info'>
					<strong className="s-text">{room.title}</strong><br/>
					<span><FaCity/> City:</span>
					{room.location.city}<br/>
					<span><FaTh/> Capacity:</span>
					{room.capacity}<br/>
					<span><FaUsers/> Size:</span>
					{room.size}
				</p>
			</article>
		</>
	);
};

export default Room;
