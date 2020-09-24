import React, { Component } from "react";
import { connect } from "react-redux";
import { getTenantBookedRooms } from "../../redux/actions/homeAction";
class TenantBookedRooms extends Component {
	constructor() {
		super();
		// console.log('Constructor')

		const tenant = JSON.parse(localStorage.getItem("user"));
		this.state = {
			name: tenant.name,
			id: tenant._id,
			email: tenant.email,
		};
	}
	componentDidMount() {
		// console.log("CDM")
		// console.log(this.state, "tenantdataa");
		this.props.getTenantBookedRooms(this.state.email);
	}

	render() {
		// if(this.props.info[0].tenant){
        //     console.log(this.props.info[0].tenant,"TENANT DATAAA")
        // }
        // console.log(this.props.info.tenant.name,"DATA IN COMPONENT")

		return this.props.info ? (
			<div className="bill">
				<p>NAME  : <strong>{this.props.info.tenant.name || "NA"}</strong></p>
				<p>EMAIL : <strong>{this.props.info.tenant.email || "NA"}</strong></p>
				<p>ENTITY : <strong>{this.props.info.tenant.id || "NA"}</strong></p>
				<p>AMOUNT : <strong>Rs:{this.props.info.tenant.amount/100 || "NA"}</strong></p>
				<p>RECEIPT : <strong>{this.props.info.tenant.entity || "NA"}</strong></p>
				<p>OFFER_ID : <strong>{this.props.info.tenant.amount_id || "NA"}</strong></p>
				<p>STATUS : <strong>{this.props.info.tenant.receipt || "NA"}</strong></p>
				<p>CREATED_AT : <strong>{this.props.info.tenant.created_at || "NA"}</strong></p>
				





            </div>
		):<div>YOU HAVEN'T BOOKED ANY ROOMS</div>
	}
}

const mapStateToProps = (state)=>{
    return{
        info : state.getTenantBookedRooms
    }
}


export default connect(mapStateToProps, { getTenantBookedRooms })(TenantBookedRooms);



/**blueprint
 *                 "name": "piyush",
                "email": "piyushmahapatra99@gmail.com",
                "id": "order_FUt3VLEkfhwFMf",
                "entity": "order",
                "amount": 100200,
                "amount_paid": 0,
                "amount_due": 100200,
                "currency": "INR",
                "receipt": "5ml7OW7W_",
                "offer_id": null,
                "status": "created",
                "attempts": 0,
                "notes": [],
                "created_at": 1598334789
            }
 */