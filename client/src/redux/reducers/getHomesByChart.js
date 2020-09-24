import { GET_HOMES_BY_CHART} from "../actions/types";


const initialState ={
   
}

const ownerHomes = (state=initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case GET_HOMES_BY_CHART:
            return {
                ...state,payload,message:"These is your Homes data for CHARTJS"
            }
            default:
                return state
            }
      
    }




    export default ownerHomes