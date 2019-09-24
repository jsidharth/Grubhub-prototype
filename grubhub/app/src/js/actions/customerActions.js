import actionTypes from "../constants/index";
import axios from "axios";

const getSearchResults = (payload) => {
    return dispatch => {
        return axios.get(`http://localhost:3001/item/customer/search`, {
            params: {
                key: payload.search
              }
        })
        .then(response => {
            if(response.status === 200) {
                dispatch({ type: actionTypes.SET_SEARCH_RESULTS, payload: response.data});
            }
        });
    }
}

export {
    getSearchResults
} 