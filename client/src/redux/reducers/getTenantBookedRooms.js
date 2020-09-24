import { TENANT_BOOKED_ROOMS } from "../actions/types";

const initialState = {
	tenant: {
        
    },
};

const getTenantBookedRooms = (state = initialState, action) => {
	const { type, payload } = action;
	// console.log(payload,"PAYLOAD DATA BEFORE REDUCER");
	switch (type) {
		case TENANT_BOOKED_ROOMS:
			return {
				...state,
				tenant:payload[0].tenant
			};
		default:
			return state;
	}
};

export default getTenantBookedRooms;
