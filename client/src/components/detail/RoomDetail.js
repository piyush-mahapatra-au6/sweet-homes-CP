import React, { Component } from "react";
import { connect } from "react-redux";
import { getRoomDetails, roomInterested } from "../../redux/actions/homeAction";
import "../../css/loader.css";
import Layout from "../core/Layout";
import Title from "../landing/Title";
import Roomdetailimage from "../landing/Roomdetailimage";
import OwnerDetail from "../landing/OwnerDetail";
import MapContainer from "../map/Map";
import { isAuth } from "../auth/helpers";
import { Link } from "react-router-dom";
import "../../css/Detailroom.css";
import { RAZOR_PAY } from "../../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
class RoomDetail extends Component {
	constructor(props) {
		super(props);
		//tenant user details from loal storage and Home ID from matach.params
		const user = JSON.parse(localStorage.getItem("user"));
		const homeId = this.props.match.params.id;
		this.state = {
			user,
			homeId,
		};
	}
	loadScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	};

	// Raxzorpay funtion
	displayRazorpay = async () => {
		const user = JSON.parse(localStorage.getItem("user"));
		let home_id = this.props.match.params.id;
		let content = this.props.roomInfo;
		const res = await this.loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) {
			alert("Razorpay SDK failed to load.Are you onlinbe?");
			return;
		}
		const data = await fetch("http://localhost:8000/api/razorpay", {
			method: "POST",
			body: JSON.stringify({
				home_id,
				name: user.name,
				email: user.email,
				price: content.price,
				status: content.status,
			}),
			headers: { "Content-type": "application/json" },
		}).then((t) => t.json());
		console.log(data, "razorpay");

		let options = {
			key: RAZOR_PAY,
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: "Rent",
			description: "Test Transaction",
			image: content.imageUrl,

			handler: function (response) {
				toast.success("payment sucessfull");
				alert("payment sucess");
				alert(response.razorpay_payment_id);
				alert(response.razorpay_order_id);
				alert(response.razorpay_signature);
			},
			prefill: {
				name: "Yash",
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	componentDidMount() {
		//Check if is is available
		// console.log(this.props.match.params.id);
		//We get the Id of the Room here
		const id = this.props.match.params.id;
		this.props.getRoomDetails(id);
	}
	handleClick = (e) => {
		e.preventDefault();
		// console.log("piyush")
		this.props.roomInterested(this.state);
		setTimeout(() => {
			toast.success(this.props.message);
		}, 4000);
	};

	interestContainer = () => {
		return isAuth() ? (
			<div className='button-group'>
				<button onClick={this.handleClick} className='btn btn-primary'>
					I'M INTERESTED
				</button>
				<button className='btn btn-primary' onClick={this.displayRazorpay}>
					PAY NOW
				</button>
			</div>
		) : (
			<Link to='/signin'>
				<button className='btn btn-primary'>
					Please sign in ,If you want to reach out to Owner/BOKK A HOME
				</button>
			</Link>
		);
	};

	render() {
		// Check for data availability  &  //Render the Data Conditionally
		let content = this.props.roomInfo ? (
			this.props.roomInfo
		) : (
			<div className='loader'> </div>
		);
		// console.log(content);
		return (
			<Layout>
				<div className='box-group'>{this.interestContainer()}</div>
				<ToastContainer />
				<Title title={content.title} />
				<div className='Ownerlayout'>
					<Roomdetailimage url={content.imageUrl} />
					<MapContainer />
				</div>
				<OwnerDetail
					address={content.address}
					advance={content.advance}
					landlord={content.landlord}
					phonenumber={content.phone}
					description={content.description}
					email={content.email}
					features={content.features}
					canteine={content.mess}
					wifi={content.wifi}
					size={content.size}
					price={content.price}
					negotiation={content.negotiation}
					status={content.status}
				/>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		roomInfo: state.getRoomDetails,
		message: state.roomInterested.message,
	};
};

export default connect(mapStateToProps, { getRoomDetails, roomInterested })(
	RoomDetail
);
