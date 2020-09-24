import { GET_MY_HOMES} from "../actions/types";


const initialState ={
   
}

const ownerHomes = (state=initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case GET_MY_HOMES:
            return {
                ...state,payload,message:"These are your Homes"
            }
            default:
                return state
            }
      
    }




    export default ownerHomes