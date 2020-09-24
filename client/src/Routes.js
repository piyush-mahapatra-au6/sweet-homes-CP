import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

//from auth components
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Activate from "./components/auth/Activate";
import Forgot from "./components/auth/Forgot";
import Reset from "./components/auth/Reset";
import Error from "./components/auth/Error";
// import history from "./components/auth/history"; FOr later use ==> delete it later

//from core components
import Owner from "./components/Ownerpages/OwnerForm";
import Updatehome from "./components/Ownerpages/Updatehome";
import OwnerDashboard from "./components/Ownerpages/OwnerDashboard";

//Protected Route define here
import Ownerroute from "./components/auth/Ownerroute";

//Owner Home Components
import HomesContainer from "./components/Ownerpages/HomesContainer";

//Tenant Components
import RoomDetail from "./components/detail/RoomDetail";
import TenantDashboard from "./components/tenantPages/TenantDashboard";



//Public Components
import Rooms from "./components/grid/Rooms";
//Redux entry
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Tenantroute from "./components/auth/Tenantroute";

const Routes = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					{/* AUTH RELATED ROUTES HERE */}
					<Route exact path='/' component={App} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/signin' component={Signin} />
					<Route exact path='/auth/activate/:token' component={Activate} />
					<Route exact path='/forgot' component={Forgot} />
					<Route exact path='/auth/password/reset/:token' component={Reset} />

					{/* OWNER PROTECTED ROUTES HERE */}
					<Ownerroute
						exact
						path='/owner-dashboard'
						component={OwnerDashboard}
					/>
					<Ownerroute exact path='/owner' component={Owner} />
					<Ownerroute exact path='/owner/update/:id' component={Updatehome} />
					<Ownerroute exact path='/owner/homes' component={HomesContainer} />

					{/* TENANT PROTECTED ROUTES HERE */}
					<Tenantroute exact path='/tenant' component={TenantDashboard} />

					{/* PUBLIC ROUTES HERE */}
					<Route exact path='/rooms' component={Rooms} />
					<Route exact path='/rooms/:id' component={RoomDetail} />


					{/* THIS IS A FALLBACK ROUTE--> UNIVERSAL */}
					<Route component={Error} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};
export default Routes;

//todos
//<Ownerroute exact path='/owner/myhomes' component={Owner} /> to view all his homes
