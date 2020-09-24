import { TENANT_ROOMS,REMOVE_TENANT_ROOMS } from "../actions/types";

const initialState = {
	// location: {
	// 	coordinates: {},
	// },
	// owner: {}
};

const getTenantRooms = (state = initialState, action) => {
	const { type, payload } = action;
	// console.log(payload);
	switch (type) {
		case TENANT_ROOMS:
			return {
				...state,
				payload,
			};
		case REMOVE_TENANT_ROOMS:
			return {
				...state
			};
		default:
			return state;
	}
};

export default getTenantRooms;
