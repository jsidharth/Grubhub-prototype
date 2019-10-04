import actionTypes from "../constants/index";
import axios from "axios";
import { toast } from "react-toastify";

const addItem = payload => {
  return dispatch => {
    return axios
      .post("http://localhost:3001/item/add", payload)
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: actionTypes.SET_ITEM, payload: response.data });
        }
        toast.success("Added to menu!");
      });
  };
};

const getItem = payload => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/item/${payload.item_id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: actionTypes.SET_ITEM, payload: response.data });
        }
      });
  };
};
const updateItem = payload => {
  return dispatch => {
    return axios
      .put(`http://localhost:3001/item/update`, payload)
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: actionTypes.SET_ITEM, payload: response.data });
        }
        toast.success("Updated!");
      });
  };
};

const deleteItem = (payload, ownProps) => {
  return dispatch => {
    return axios
      .delete(`http://localhost:3001/item/delete/${payload.item_id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: actionTypes.CLEAR_ITEM, payload: {} });
          ownProps.history.push(`/${payload.userid}/menu`);
          toast.success("Deleted!");
        }
      });
  };
};

const uploadImage = payload => {
  return dispatch => {
    return axios
      .post(`http://localhost:3001/user/upload/image`, payload)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_ITEM_IMAGE,
            payload: response.data
          });
          toast.success("Uploaded");
        }
      });
  };
};
export { addItem, getItem, updateItem, deleteItem, uploadImage };
