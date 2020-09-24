import React from "react";
import Layout from "../core/Layout";
import { newHome, updateHome } from "../../redux/actions/homeAction";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { CLOUDINARY_API, CLOUDINARY_NAME } from "../../API";
import "react-toastify/dist/ReactToastify.min.css";
import "../../css/ownerForm.css";
class Owner extends React.Component {
	constructor() {
		super();
		//to get the Owner data from the Local Storage and send it to Server,so that it can be associated with a New Home that is Created
		const user = JSON.parse(localStorage.getItem("user"));
		this.state = {
			//basic details
			title: "",
			description: "",
			features: "",
			landlord:user.name,
			email:user.email,
			phone:0,
			address: "",
			price: 0,
			capacity: 0,
			owner: user,
			//advanced details
			status: 0,
			negotiation: "",
			size: 0,
			wifi: "",
			isFeatured: "",
			status: "",
			mess: "",
			//image state here
			image: "",
			imageUrl: "",
		};
	}

	//post image and then make a network request
	postDetails = () => {
		const { image } = this.state;
		const data = new FormData();
		data.append("file", image);
		//Cloudinary Tweaks here
		data.append("upload_preset", "sweethomes");
		data.append("cloud_name", CLOUDINARY_NAME);
		fetch(CLOUDINARY_API, {
			method: "post",
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				this.setState({ imageUrl: data.url });
				setTimeout(() => {
					toast.success("The image is Accepted,Click on Submit From");
				}, 2000);
			})
			.catch((err) => console.log(err));
	};

	handleclick = (e) => {
		e.preventDefault();
		// console.log(this.state)
		//submit the image details
		// this.postDetails();

		//calling the Action to dispatch this object to Reducer Function
		this.props.newHome(this.state);
		setTimeout(() => {
			toast.success(this.props.message);
		}, 3000);
		// console.log(this.props.Homedetails)
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(e.target.value, e.target.name);
	};

	//This is a Fallback async call for Image

	handleImage = (e) => {
		this.setState({ image: e.target.files[0] });
	};

	handleView = () => {
		this.props.history.push("/owner/homes");
	};

	

	//BASIC FORM FOR OWNER
	ownerForm = () => {
		return (
			<form className='mainForm row' onSubmit={(e) => this.handleclick(e)}>
				{/* --------------------This is BAsic form1 for owner------------------ */}
				<div className='col-lg-6 col-md-6 col-sm-6 formBox'>
					<span style={{ textDecoration: "underline" }}>
						THESE ARE REQUIRED FIELDS
					</span>
					<div class='form-group'>
						<label for='inputEmail4'>What is your Home's Name?</label>
						<input
							onChange={this.handleChange}
							required
							type='text'
							name='title'
							class='form-control'
							id='inputEmail4'
							placeholder='NICE HOME NAME'
						/>
					</div>
					<div class='form-group'>
						<label for='inputPassword4'>Descrbe Your Home in Few Words</label>
						<input
							onChange={this.handleChange}
							required
							type='text'
							name='description'
							class='form-control'
							id='inputAddress'
							placeholder='Describe your Home'
						/>
					</div>
					<div class='form-group'>
						<label for='inputPassword4'>
							List out Features Separated by Comma
						</label>
						<input
							onChange={this.handleChange}
							required
							type='text'
							name='features'
							class='form-control'
							id='inputAddress'
							placeholder='Features of your Home'
						/>
					</div>
					<div class='form-group'>
						<label for='inputAddress'>address</label>
						<span>ex: H.NO & STREET NAME,CITY,STATE,ZIPCODE,COUNTRY CODE</span>
						<input
							onChange={this.handleChange}
							required
							type='text'
							name='address'
							class='form-control'
							id='inputAddress'
							placeholder='H.NO STREETNAME,CITY,ZIPCODE,IN'
						/>
					</div>
					<div class='form-group'>
						<label for='inputPassword4'>What is your Expected Rent?</label>
						
						<input
							onChange={this.handleChange}
							required
							type='number'
							name='price'
							class='form-control'
							id='inputAddress'
							placeholder='Enter in Numbers '
						/>
					</div>

					<div class='form-group'>
						<label for='inputPassword4'>What is Home's Capacity?</label>
						
						<input
							onChange={this.handleChange}
							required
							type='number'
							name='capacity'
							class='form-control'
							id='inputAddress'
							placeholder='2 4 OR 6 ?'
						/>
					</div>
					<div class='form-group'>
						<label for='inputEmail4'>What is your Contact Number?</label>
						<br/>
						<input
							onChange={this.handleChange}
							type='number'
							name='phone'
							class='form-control'
							id='inputEmail4'
							placeholder='8074220270'
						/>
					</div>
				</div>
				{/*------------------- Separate the form 2 here ------------------------*/}
				<div className='col-lg-6 col-md-6 col-sm-6 formBox'>
					<span style={{ textDecoration: "underline" }}>
						THESE ARE OPTIONAL/ADDITIONAL DETAILS
					</span>

					<div class='form-group'>
						<label for='inputEmail4'>What is Home's Size  sq/cm?</label>
						<br/>
						<input
							onChange={this.handleChange}
							type='number'
							name='size'
							class='form-control'
							id='inputEmail4'
							placeholder='450'
						/>
					</div>
					
					<div onChange={this.handleChange} class='form-group'>
						<label for='inputPassword4'>Does your Home have a Mess?</label>
						<br/>
						<input
							type='radio'
							name='mess'
							value='yes'
							
						/>YES
						<br/>
						<input
							type='radio'
							name='mess'
							value='no'
							
						/>NO
					</div>
					<div onChange={this.handleChange} class='form-group'>
						<label for='inputPassword4'>Does your Home have Wifi?</label>
						<br/>
						<input
							type='radio'
							name='wifi'
							value='yes'
							
						/>YES
						<br/>
						<input
							type='radio'
							name='wifi'
							value='no'
							
						/>NO
					</div>

					<div onChange={this.handleChange} class='form-group'>
						<label for='inputPassword4'>Do you want your Home to be Featured?</label>
						<br/>
						<input
							type='radio'
							name='isFeatured'
							value='yes'
							
						/>YES
						<br/>
						<input
							type='radio'
							name='isFeatured'
							value='no'
							
						/>NO
					</div>
					<div onChange={this.handleChange} class='form-group'>
						<label for='inputPassword4'>Is the Home Rent Negotiable??</label>
						<br/>
						<input
							type='radio'
							name='negotiation'
							value='yes'
							
						/>YES
						<br/>
						<input
							type='radio'
							name='negotiation'
							value='no'
							
						/>NO
					</div>
					<div onChange={this.handleChange} class='form-group'>
						<label for='inputPassword4'>What is the status of your Home?</label>
						<input
							type='radio'
							name='status'
							value='open'
							
						/>Vacant
						<input
							type='radio'
							name='status'
							value='close'
							
						/>Not Vacant
					</div>
				</div>
				<div className='formBox3 '>
					<div class='form-group'>
						<div class='form-check'>
							<input
								class='form-check-input'
								type='checkbox'
								name="TC"
								id='gridCheck'
								required
							/>
							<label class='form-check-label' for='gridCheck'>
								I Accept Terms and Conditions
							</label>
						</div>
					</div>
					<input type='submit' value='Submit Details' className='btn btn-primary' />
				</div>
			</form>
		);
	};

	render() {
		return (
			<Layout>
				<ToastContainer />
				<button onClick={this.handleView}>VIEW MY HOMES</button>
				<div className='container'>
					{this.ownerForm()}
					<div class='form-group'>
						<label for='inputPassword4'>Please Upload Home Pics here</label>
						<input
							onChange={this.handleImage}
							type='file'
							name='image'
							class='form-control'
							id='inputAddress'
						/>
						{/* //FALLBACK  FOR IMAGE ASYNC REQ */}
						<button onClick={this.postDetails}>
							Click to Select this image
						</button>
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.home.message,
		Homedetails: state.home.payload,
	};
};

export default connect(mapStateToProps, { newHome })(Owner);

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




// handleCheck =(e) =>{
// 	this.setState({[e.target.name]: e.target.checked})
// 	console.log(e.target.checked,e.target.name)
// }