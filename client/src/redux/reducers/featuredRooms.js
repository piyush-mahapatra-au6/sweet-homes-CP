import { FEATURED_ROOMS} from "../actions/types";


const initialState ={
   
}

const featuredRooms = (state=initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case FEATURED_ROOMS:
            return {
                ...state,payload,message:"These are your Featured Rooms"
            }
            default:
                return state
            }
      
    }



    export default featuredRooms