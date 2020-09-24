import React, { Component } from "react";
import Ownerlayout from "../ownerlayout/Ownerlayout";
import Statuslayout from '../ownerlayout/Statuslayout'

export default class OwnerDetail extends Component {

handleClick(){
 
}
	render() {
		// console.log(this.props);
		return (

<div
				className='container'
				>
			
				<Ownerlayout
					headline={"Address"}
					value={this.props.address}
					headline2={"Landlord Name"}
					value2={this.props.landlord}
					headline3={"Landlord Number"}
					value3={this.props.phonenumber}
				/>
				<Ownerlayout
					headline={"Advance Given"}
					value={<i class='fa fa-inr'>{this.props.advance}</i>}
					headline2={"Description"}
					value2={this.props.description}
					headline3={"LandLord Email"}
					value3={this.props.email}
				/>
				<Ownerlayout
					headline={"Features"}
					value={this.props.features}
					headline2={"Have a Canteen ?"}
					value2={this.props.canteine}
					headline3={"Wifi Availability?"}
					value3={this.props.wifi}
				/>
				<Ownerlayout
					headline={"Size"}
					value={this.props.size}
					headline2={"Rent of Room ?"}
					value2={<i class='fa fa-inr'>{this.props.price}</i>}
					headline3={"Scope for Negotiation?"}
					value3={this.props.negotiation}
				/>
				<Statuslayout headline={"Status"} value={this.props.status}/>
			</div>

		);
	}
}


