import actionTypes from "../constants/index";
import axios from "axios";

const addItem = (payload) => {
    return dispatch => {
        return axios.post('http://localhost:3001/item/add', payload)
        .then(response => {
            if(response.status === 200) {
                dispatch({ type: actionTypes.SET_ITEM, payload: response.data});
            }
        })
    }
}

const getItem = (payload) => {
    return dispatch => {
        return axios.get(`http://localhost:3001/item/${payload.item_id}`)
        .then(response => {
            if(response.status === 200) {
                dispatch({ type: actionTypes.SET_ITEM, payload: response.data});
            }
        });
    }
}
const updateItem = (payload) => {
    return dispatch => {
        return axios.put(`http://localhost:3001/item/update`, payload)
        .then(response => {
            if(response.status === 200) {
                dispatch({ type: actionTypes.SET_ITEM, payload: response.data});
            }
        });
    }
}

const deleteItem = (payload, ownProps) => {
    return dispatch => {
        return axios.delete(`http://localhost:3001/item/delete/${payload.item_id}`)
        .then(response => {
            if(response.status === 200) {
                dispatch({ type: actionTypes.CLEAR_ITEM, payload: {}});
                ownProps.history.push(`/${payload.userid}/menu`);
            }
        });
    }
}
export {
    addItem,
    getItem,
    updateItem,
    deleteItem
}