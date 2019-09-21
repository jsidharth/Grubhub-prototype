import actionTypes from "../constants/index";
import axios from "axios";

const getRestaurant = (payload) => {
    return dispatch => {
        return axios.get(`http://localhost:3001/restaurant/${payload.user_id}`)
        .then(resposne => {
            if(resposne.status === 200) {
                dispatch({type: actionTypes.SET_RESTAURANT, payload: resposne.data})
            }
        });
    }
}

export {
    getRestaurant
}