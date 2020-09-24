


// export class Homecard extends Component {

// 	render() {
// 		const { home } = this.props;
// 		return (
// 			<div className='col-md-3 mb-5'>
// 				<div className='card card-body bg-dark text-center h-100'>
// 					<img className='w-100 mb-2' src={home.imageUrl} alt='Movie Cover' />
// 					<h6 className='text-light card-title'>{home.title}</h6>
// 					<h6>Rs:{home.price}</h6>
// 					<span>{home.description}</span>
// 					<span>{home.location.formattedAddress}</span>

// 					<span>{}</span>

// 					<Link
// 						to={{
// 							pathname: `/owner/update/${home._id}`,

// 							state: {
// 								home: home._id,
// 							},
// 						}}>
// 						Update Home Details
// 					</Link>
					
					
// 				</div>
// 			</div>
// 		);
// 	}
// }







// {
// 	/* //I have obeserved that in the /owner/update/:id route ,we are able to console a router object,in that obejext there is an empty object called state where we can pass the prop of interest and I have used the propOfInterest(id here) to fetch the respective data by making it as a query parameter for our API */
// }
// // you can access it with 		const id = this.props.location.state.home; in next page




import React from "react";
import { Link } from "react-router-dom";
import "../../css/room.css";
import defaultImg from "../../images/work-1.jpg";
import { FaRupeeSign,FaTh,FaCity,FaUsers} from "react-icons/fa";

class Homecard extends React.Component{

	render(){
		const { home } = this.props;
		return (
			<>
				<article className='room'>
					<div className='img-container'>
						<img src={home.imageUrl || defaultImg} />
						<div className='price-top'>
							<h6><FaRupeeSign/>{home.price}</h6>
							<p>per month</p>
						</div>
						<Link
						className="btn-primary room-link"
						to={{
							pathname: `/owner/update/${home._id}`,

							state: {
								home: home._id,
							},
						}}>
						Update/Delete Home
					</Link>
					</div>
					<p className='room-info'>
						<strong className="s-text">{home.title}</strong><br/>
						<span><FaCity/> City:</span>
						{home.location.city}<br/>
						<span><FaTh/> Capacity:</span>
						{home.capacity}<br/>
						<span><FaUsers/> Size:</span>
						{home.size}<br/>
						<span><FaUsers/> Wifi:</span>
						{home.wifi}<br/>
						<span><FaUsers/> Mess:</span>
						{home.mess}<br/>
						<span><FaUsers/> Status:</span>
						{home.status}<br/>
						<span><FaUsers/> Advance:</span>
						{home.advance}<br/>
						<span>TenantsInterested:{home.isInterested.length}</span>
						
					</p>
				</article>
			</>
		);
	}
}




export default Homecard;
