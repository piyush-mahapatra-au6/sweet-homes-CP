import { combineReducers } from "redux";
import homeReducer from "./newHome";
import ownerHomes from "./ownerHomes";
import updateHome from "./updateHome";
import deleteHome from "./deleteHome";
import featuredRooms from "./featuredRooms";
import getStatistics from "./getStatistics";
import getRooms from "./getRooms";
import getRoomDetails from "./getRoomDetails";
import getHomesByChart from "./getHomesByChart";
import roomInterested from "./roomInterested";
import getTenantRooms from "./getTenantRooms";
import getTenantBookedRooms from "./getTenantBookedRooms";






export default combineReducers({
	home: homeReducer,
	ownerHomes: ownerHomes,
	updateHome:updateHome,
	deleteHome:deleteHome,
	featuredRooms:featuredRooms,
	getStatistics:getStatistics,
	getRooms:getRooms,
	getRoomDetails:getRoomDetails,
	getHomesByChart:getHomesByChart,
	roomInterested:roomInterested ,
	getTenantRooms:getTenantRooms ,
	getTenantBookedRooms:getTenantBookedRooms 




});
