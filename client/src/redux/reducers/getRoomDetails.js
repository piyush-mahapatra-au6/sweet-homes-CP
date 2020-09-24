import { GET_ROOM_DETAILS } from "../actions/types";

const initialState = {
	location: {
		coordinates: {},
	},
	owner: {},
};
const getRoomDetails = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ROOM_DETAILS:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default getRoomDetails;
