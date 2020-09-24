import React,{Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from './helpers'

function Tenantroute({component:Component , ...rest }) {
    return (
      
      <Route
        {...rest}
            render={(props) =>
           
            isAuth() && isAuth().role === 'tenant' ? <Component {...props} /> : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}
  export default Tenantroute