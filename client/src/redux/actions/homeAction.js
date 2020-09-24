import {
	NEW_HOME,
	GET_ROOMS,
	GET_HOME_BY_ID,
	GET_HOME_BY_CITY,
	GET_MY_HOMES,
	UPDATE_HOME,
	DELETE_HOME,
	FEATURED_ROOMS,
	STATISTICS,
	ROOMS_BY_CITY,
	ROOMS_BY_NEED,
	ROOMS_BY_FUZZY,
	ROOMS_BY_CAPACITY,
	ROOMS_BY_SIZE,
	ROOMS_BY_PRICE,
	GET_ROOM_DETAILS,
	GET_HOMES_BY_CHART,
	ROOM_INTERESTED,
	ROOMS_BY_ZIPCODE_RADIUS,
	TENANT_ROOMS,
	REMOVE_TENANT_ROOMS,
	TENANT_BOOKED_ROOMS
} from "./types";
import axios from "axios";
import { LOCAL_API } from "../../API";

// ----------------------------------------OWNER DASHBOARD-OWNER SIDE ---------------------------------//

// POST HOME DETAILS -OWNER
export const newHome = (obj) => async (dispatch) => {
	// console.log(obj);
	try {
		const response = await axios.post(`${LOCAL_API}/Home/new`, obj);
		dispatch({
			type: NEW_HOME,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
	}
};

//UPDATE HOME
export const updateHome = (id, obj) => async (dispatch) => {
	try {
		const response = await axios.put(`${LOCAL_API}/Home/${id}`, obj);

		dispatch({
			type: UPDATE_HOME,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
	}
};

//GET OWNER HOMES
export const getOwnerHomes = (id) => async (dispatch) => {
	try {
		const response = await axios.get(`${LOCAL_API}/ownerhomes/${id}`);

		dispatch({
			type: GET_MY_HOMES,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

//DELETE HOMES BY OWNER
export const deleteOwnerHomes = (id) => async (dispatch) => {
	try {
		const response = await axios.delete(`${LOCAL_API}/ownerhomes/${id}`);

		dispatch({
			type: DELETE_HOME,
		});
	} catch (error) {
		console.log(error);
	}
};

//GET OWNER HOMES
export const getHomesByChart = (id) => async (dispatch) => {
	try {
		const response = await axios.get(`${LOCAL_API}/getHomesByChart/${id}`);

		dispatch({
			type: GET_HOMES_BY_CHART,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

// ----------------------------------------LANDING PAGE-TENANTSIDE ---------------------------------//

export const getFeaturedRooms = () => async (dispatch) => {
	try {
		const response = await axios.get(`${LOCAL_API}/featuredRooms/`);

		dispatch({
			type: FEATURED_ROOMS,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getStatistics = () => async (dispatch) => {
	try {
		const response = await axios.get(`${LOCAL_API}/statistics`);

		dispatch({
			type: STATISTICS,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

//----------------------------------------GRID PAGE 4X4-----------------------------------------//

export const getRooms = () => async (dispatch) => {
	try {
		const response = await axios.get(`${LOCAL_API}/getRooms`);

		dispatch({
			type: GET_ROOMS,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getRoomsByCity = (city) => async (dispatch) => {
	try {
		const response = await axios.get(`${LOCAL_API}/roomsByCity?city=${city}`);
		console.log(response.data);
		dispatch({
			type: ROOMS_BY_CITY,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getRoomsByPrice = (range) => async (dispatch) => {
	try {
		const response = await axios.get(
			`${LOCAL_API}/roomsByPrice?price=${range}`
		);
		console.log(response.data);
		dispatch({
			type: ROOMS_BY_PRICE,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getRoomsByNeed = (obj) => async (dispatch) => {
	//pull out all the filed values
	const { wifi, mess } = obj;
	try {
		const response = await axios.get(
			`${LOCAL_API}/roomsByNeed?wifi=${wifi}&mess=${mess}`
		);
		console.log(response.data);
		dispatch({
			type: ROOMS_BY_NEED,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getRoomsByCapacity = (capacity) => async (dispatch) => {
	// console.log(capacity);
	try {
		const response = await axios.get(
			`${LOCAL_API}/roomsByCapacity?capacity=${capacity}`
		);
		// console.log(response.data)
		dispatch({
			type: ROOMS_BY_CAPACITY,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getRoomsByFuzzy = (fuzzy) => async (dispatch) => {
	// console.log(fuzzy);
	try {
		const response = await axios.get(`${LOCAL_API}/fuzzy?search=${fuzzy}`);
		// console.log(response.data)
		dispatch({
			type: ROOMS_BY_FUZZY,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getRoomsByZipcodeRadius = (obj) => async (dispatch) => {
	//pull out all the filed values
// console.log(obj)
	let zipcode = parseInt(obj.zipcode);
	let distance = parseInt(obj.distance);
console.log(zipcode,distance)
	try {
		const response = await axios.get(
			`${LOCAL_API}/homes/${zipcode}/${distance}`
		);
		console.log(response.data);
		dispatch({
			type: ROOMS_BY_ZIPCODE_RADIUS,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

//----------------------------RoomInfo--Components-----------------------------//

export const getRoomDetails = (id) => async (dispatch) => {
	try {
		const response = await axios.get(`${LOCAL_API}/getRoomDetails/${id}`);
		console.log(response.data, "yash");
		dispatch({
			type: GET_ROOM_DETAILS,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

// TENANT INTERESTED IN A HOME
export const roomInterested = (obj) => async (dispatch) => {
	//here the obj corresponds to local state which contains Home Id and user email
	//The structure of the obj needs to be obj = {homeId,user:{name:"name",email:"email",rest:"rest"}}

	try {
		const response = await axios.post(`${LOCAL_API}/roomInterested`, obj);
		dispatch({
			type: ROOM_INTERESTED,
			payload: response.data.message,
		});
	} catch (error) {
		console.log(error);
	}
};

//----------------------------TENANT-INTERESTED/NO INTERESTED ROOMS-DASHBOARD----------------//
// TENANT INTERESTED IN A HOME
export const getTenantRooms = (obj) => async (dispatch) => {
//obj here has tennat data collected from local storage to identify the home he has booked/interested in 
// console.log(obj)
	try {
		const response = await axios.post(`${LOCAL_API}/getTenantRooms`, obj);
		dispatch({
			type: TENANT_ROOMS,
			payload: response.data.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const removeTenantRooms = (obj) => async (dispatch) => {
	//obj here has tennat data collected from local storage to identify the home he has booked/interested in 
	// console.log(obj)
		try {
			const response = await axios.post(`${LOCAL_API}/removeTenantRooms`, obj);
			dispatch({
				type: REMOVE_TENANT_ROOMS
			});
		} catch (error) {
			console.log(error);
		}
	};



export const getTenantBookedRooms = (email) => async (dispatch) => {
		//obj here has tennat data collected from local storage to identify the home he has booked/interested in 
		
			try {
				const response = await axios.get(`${LOCAL_API}/getTenantBookedRooms?email=${email}`);
				dispatch({
					type: TENANT_BOOKED_ROOMS,
					payload:response.data.data
				});
			} catch (error) {
				console.log(error);
			}
		};