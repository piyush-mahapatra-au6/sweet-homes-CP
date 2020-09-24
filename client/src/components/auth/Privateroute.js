import React,{Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from './helpers'

function Privateroute({component:Component , ...rest }) {
    return (
      
      <Route
        {...rest}
            render={(props) =>
           
          isAuth() ? <Component {...props} /> : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}
  export default Privateroute