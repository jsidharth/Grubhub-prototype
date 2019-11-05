import actionTypes from "../constants/index";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import config from "../../config";

const addUser = (payload, ownProps) => {
  return dispatch => {
    return axios
      .post(`${config.base_url}user/register`, payload)
      .then(response => {
        if (response.status === 200) {
          const userData = response.data;
          cookie.set("token", userData.token, { expires: 1 });
          dispatch({ type: actionTypes.SET_USER, payload: userData });
          ownProps.history.push(`/signin`);
        }
      });
  };
};

const loginUser = (payload, ownProps) => {
  return dispatch => {
    return axios
      .post(`${config.base_url}user/login`, payload)
      .then(response => {
        if (response.status === 200) {
          const userData = response.data;
          cookie.set("token", userData.token, { expires: 1 });
          dispatch({ type: actionTypes.SET_USER, payload: userData });
          if (userData.type === "Owner") {
            // A restaurant document with blank details is created. Set the restaurant id of the user
            dispatch({ type: actionTypes.SET_RESTAURANT, payload: {id: userData.restaurant} });
            ownProps.history.push(`/${userData.id}/account`);
          } else {
            ownProps.history.push(`/${userData.id}/search`);
          }
        }
      })
      .catch(err => {
        toast.error("Invalid credentials");
      });
  };
};
//TODO: test user update as code updated
const updateUser = payload => {
  return dispatch => {
    return axios
      .put(`${config.base_url}user/update/${payload.id}`, payload)
      .then(response => {
        if (response.status === 200) {
          const userData = response.data.user;
          userData.valid_update = true;
          dispatch({ type: actionTypes.SET_USER, payload: userData });
          if (userData.type === "Owner") {
            const restaurantData = response.data.restaurant;
            dispatch({
              type: actionTypes.SET_RESTAURANT,
              payload: restaurantData
            });
          }
          toast.success("Updated");
        }
      });
  };
};

const getUser = payload => {
  return dispatch => {
    return axios
      .get(`${config.base_url}user/getdetails/${payload.user_id}`)
      .then(response => {
        if (response.status === 200) {
          const userData = response.data;
          dispatch({ type: actionTypes.SET_USER, payload: userData });
        }
      });
  };
};

const uploadProfileImage = payload => {
  return dispatch => {
    return axios
      .post(
        `${config.base_url}user/upload/image/profile/${payload.user_id}`,
        payload.data
      )
      .then(response => {
        if (response.status === 200) {
          toast.success("Uploaded");
        }
      });
  };
};

const sendMessage = payload => {
  return dispatch => {
    return axios.put(
      `${config.base_url}order/messages/save`,
        payload
    ).then(response => {
      if (response.status === 200) {
        toast.success("Message send successfully");
      }
      dispatch({
        type: actionTypes.SET_ORDER_DETAIL,
        payload: response.data
      });
    });
  }
}
export { addUser, loginUser, updateUser, getUser, uploadProfileImage, sendMessage };
