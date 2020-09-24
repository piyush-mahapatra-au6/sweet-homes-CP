import { NEW_HOME,GET_HOME_BY_ID,GET_HOME_BY_CITY,UPDATE_HOME,DELETE_HOME,GET_MYHOMES_OWNER} from "../actions/types";


const initialState ={

}

const homeReducer = (state=initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case NEW_HOME:
            return {
                state,payload,message:"successfully Added"
            }
            default:
                return state
            }
      
    }




    export default homeReducer