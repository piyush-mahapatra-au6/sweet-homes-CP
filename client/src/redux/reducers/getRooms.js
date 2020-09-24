import {
	GET_ROOMS,
	ROOMS_BY_CITY,
	ROOMS_BY_PRICE,
	ROOMS_BY_NEED,
	ROOMS_BY_CAPACITY,
	ROOMS_BY_FUZZY,
	ROOMS_BY_SIZE,
	ROOMS_BY_ZIPCODE_RADIUS,
} from "../actions/types";

const initialState = {};

const rooms = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_ROOMS:
			return {
				...state,
				payload,
				message: "These are all your Rooms",
			};
		case ROOMS_BY_CITY:
			return {
				...state,
				payload,
				message: "These are your Rooms by City",
			};
		case ROOMS_BY_PRICE:
			return {
				...state,
				payload,
				message: "These are your Rooms By Price",
			};
		case ROOMS_BY_CAPACITY:
			return {
				...state,
				payload,
				message: "These are your Rooms By Capacity",
			};
		case ROOMS_BY_FUZZY:
			return {
				...state,
				payload,
				message: "These are your Rooms By Fuzzy Search on Title",
			};
		case ROOMS_BY_NEED:
			return {
				...state,
				payload,
				message: "These are your Rooms By Need(Wifi,Mess and Pets)",
			};
		case ROOMS_BY_ZIPCODE_RADIUS:
			return {
				...state,
				payload,
				message: "These are your Rooms based on Zipcode and Radius",
			};
		default:
			return state;
	}
};

export default rooms;
