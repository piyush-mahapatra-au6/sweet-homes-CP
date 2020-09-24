import { ROOM_INTERESTED} from "../actions/types";


const initialState ={

}

const homeReducer = (state=initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case ROOM_INTERESTED:
            return {
                state,payload,message:'your email id has been shared with owner of this house'
            }
            default:
                return state
            }
      
    }




    export default homeReducer