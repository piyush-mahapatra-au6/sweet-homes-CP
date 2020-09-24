import React from "react";
import Layout from "../core/Layout";
import { updateHome, deleteOwnerHomes } from "../../redux/actions/homeAction";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import update from "../../images/svg/update.svg";

import { Redirect } from "react-router-dom";

class Updatehome extends React.Component {
	constructor(props) {
		super(props);
		//To get the HomeData from the url params string and ,separate the :id & pass it down in an action
		this.id = this.props.location.state.home;
		const user = JSON.parse(localStorage.getItem("user"));
		this.state = {
			title: "",
			description: "",
			features: "",
			address: "",
			price: "",
			status: "open",
			negotiation: true,
			owner: user,
		};
	}

	handleclick = (e) => {
		e.preventDefault();
		// console.log(this.state)
		//calling the Action to dispatch this object to Reducer Function
		this.props.updateHome(this.id, this.state);
		setTimeout(() => {
			toast.success(this.props.message);
		}, 2000);
		// console.log(this.props.Homedetails)
	};

	handleDelete = () => {
    //calling an action to delete the Home ,as requested by the Owner
    // console.log("DElete Button has been clicked")
    // console.log(this.id)
	this.props.deleteOwnerHomes(this.id);
    // toast.success(this.props.delMessage);
	this.props.history.push('/owner/homes')
	toast.success(this.props.delMessage);
   
		
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	ownerForm = () => {
		return (
			
				<form onSubmit={(e) => this.handleclick(e)}>
				<div class='form-group'>
					<label for='inputEmail4'>What is Updated Home's Name?</label>
					<input
						onChange={this.handleChange}
						type='text'
						required
						name='title'
						class='form-control'
						id='inputEmail4'
						placeholder='Update Name Here'
					/>
				</div>
				<div class='form-group'>
					<label for='inputPassword4'>Update description here:</label>
					<input
						onChange={this.handleChange}
						type='text'
						name='description'
						class='form-control'
						id='inputAddress'
						placeholder='Describe your Home'
					/>
				</div>
				<div class='form-group'>
					<label for='inputPassword4'>Updtaed features of your Home</label>
					<input
						onChange={this.handleChange}
						type='text'
						name='features'
						class='form-control'
						id='inputAddress'
						placeholder='Features of your Home'
					/>
				</div>

				<div class='form-group'>
				
					<label for='inputAddress'>Updated address</label>
					<span>EX: 1234 Main St,Hyderabad,IN,500074</span>
					<input
					required
						onChange={this.handleChange}
						type='text'
						name='address'
						class='form-control'
						id='inputAddress'
						placeholder='Street,City,Country-Code,Zipcode'
					/>
				</div>
				<div class='form-group'>
					<label for='inputPassword4'>What is Updated Rent?</label>
					<input
					required
						onChange={this.handleChange}
						type='number'
						name='price'
						class='form-control'
						id='inputAddress'
						placeholder='Enter in Numbers '
					/>
				</div>
				<div onChange={this.handleChange} class='form-group'>
						<label for='inputPassword4'>What is the status of your Home**?</label>
						<input
						
							type='radio'
							name='status'
							value='open'
							
						/>Vacant
						<br></br>
						<input
							type='radio'
							name='status'
							value='close'
							
						/>Not Vacant
					</div>

				<div class='form-group'>
					<div class='form-check'>
						<input
							onChange={this.handleChange}
							class='form-check-input'
							type='checkbox'
							id='gridCheck'
						/>
						<label class='form-check-label' for='gridCheck'>
							I Accept Terms and Conditions*
						</label>
					</div>
				</div>
				<button type='submit' class='btn btn-danger'>
					Submit
				</button>
			</form>
			
		);
	};
	render() {
		return (
			<Layout>
				<ToastContainer />

				<div className="container">
				<div
					className='row '
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "80vh",
					}}>
					<div className='col-lg-6 col-md-6 col-sm-6'>
						<h4 className='p-2 text-center'>
							Update the Data here:
						</h4>
						{this.ownerForm()}
					</div>
					<div className='box col-lg-6 col-md-6 col-sm-6 '>
						<img src={update} />
						<button className=" ml-5 mt-5 btn btn-primary"onClick={this.handleDelete}>DELETE THIS HOME</button>
					</div>
				</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.updateHome.message,
		Homedetails: state.home.payload,
		delMessage: state.deleteHome.payload,
	};
};

export default connect(mapStateToProps, { updateHome, deleteOwnerHomes })(
	Updatehome
);

// THis is a Nested Layout
{
	/* <div class="row">
  <div class="col-8">
    .col-8
    <div class="row">
      <div class="col-6">.col-6</div>
      <div class="col-6">.col-6</div>
    </div>
  </div>
  <div class="col-4">.col-4</div>
</div> */
}
