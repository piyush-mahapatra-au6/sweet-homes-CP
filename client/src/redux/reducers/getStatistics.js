import { STATISTICS} from "../actions/types";


const initialState ={
   
}

const getStatistics = (state=initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case STATISTICS:
            return {
                ...state,payload,message:"These are your Statistics"
            }
            default:
                return state
            }
      
    }

  export default getStatistics