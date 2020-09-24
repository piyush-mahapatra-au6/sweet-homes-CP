import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "../auth/helpers";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import {FaGooglePlus  } from "react-icons/fa";

class Google extends React.Component {
    responseGoogle = (response) => {
        console.log(response.tokenId)
        axios({
            method: 'POST',
            url: 'http://localhost:8000/api/google-login',
            data:{idToken:response.tokenId}
        })
            .then(response => {
              {this.props.informParent(response)}
              // this.props.history.push("/")
              
                // inform parent component
        })
            .catch(error => {
              console.log('Google SIgin ', error.response)
              toast.warn("Email id already taken")
            })
  };
  render() {
    return (
      <div className="pb-3">
        <GoogleLogin
          clientId="653822269227-9sv70o858bnj4tq2g2qgjc23od9hinrt.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          render={(renderProps) => (


              <button
                 
              onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="btn btn-danger btn-lg btn-block"
            ><FaGooglePlus/>
                 <strong className="ml-1">  Login with Google</strong> 
              </button>
              
          )}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}
export default Google;
