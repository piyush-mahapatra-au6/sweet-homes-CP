import { NEW_HOME,GET_HOME_BY_ID,GET_HOME_BY_CITY,UPDATE_HOME,DELETE_HOME,GET_HOMES} from "../actions/types";


const initialState ={

}

const updateHome = (state=initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case UPDATE_HOME:
            return {
                state,payload,message:"successfully Updated"
            }
            default:
                return state
            }
      
    }

    export default updateHome