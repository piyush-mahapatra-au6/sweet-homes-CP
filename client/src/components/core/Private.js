import React from 'react'
import Layout from './Layout'
import { newHome } from "../../redux/actions/homeAction";
import {connect} from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import welcome from "../../images/svg/welcome.svg";


class Private extends React.Component{

    state = {
		title: "",
		description: "",
        features: "",
        address:"",
        price:0,
        status:0,
        negotiation: true
	}
handleclick=(e)=>{
e.preventDefault()
console.log(this.state)
this.props.newHome(this.state)
toast.success(this.props.message);
}
    
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

    ownerForm =()=>{
       return <form onSubmit={(e) => this.handleclick(e)}>
  
    <div class="form-group">
      <label for="inputEmail4">What is Home's Name?</label>
      <input onChange={this.handleChange} type="text" name='title'class="form-control" id="inputEmail4" placeholder="Email"/>
    </div>
    <div class="form-group">
      <label for="inputPassword4">Descrbe Your Home in Few Words</label>
      <input onChange={this.handleChange} type="text" name='description'class="form-control" id="inputAddress" placeholder="Describe your Home"/>
    </div>
    <div class="form-group">
      <label for="inputPassword4">Some features about your Home</label>
      <input onChange={this.handleChange} type="text" name='features'class="form-control" id="inputAddress" placeholder="Features of your Home"/>
    </div>
  
  <div class="form-group">
    <label for="inputAddress">address</label>
    <span>EX: 1234 Main St,Hyderabad,IN,500074</span>
    <input onChange={this.handleChange} type="text"name='address' class="form-control" id="inputAddress" placeholder="Street,City,Country-Code,Zipcode"/>
  </div>
  <div class="form-group">
      <label for="inputPassword4">What is your Expected Rent?</label>
      <input onChange={this.handleChange} type="number" name='price'class="form-control" id="inputAddress" placeholder="Enter in Numbers "/>
    </div>

  <div class="form-group">
    <div class="form-check">
      <input onChange={this.handleChange} class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    }
    render() {
        return (
            <Layout>
            <ToastContainer />

            <div
                className='row '
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}>
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <h1 className='p-5 text-center'>Fill up Home Details Here </h1>
                    {this.ownerForm()}
                </div>
                <div className='box col-lg-6 col-md-6 col-sm-6 '>
                    <img src={welcome} />
                </div>
            </div>
        </Layout>
             
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        message:state.home.message,
        payload: state.home.payload

    }
}

export default connect(mapStateToProps, { newHome })(Private)