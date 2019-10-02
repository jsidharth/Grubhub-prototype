import actionTypes from "../constants/index";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";

const addUser = (payload, ownProps) => {
  return dispatch => {
    return axios
      .post("http://localhost:3001/user/register", payload)
      .then(response => {
        if (response.status === 200) {
          const userData = response.data;
          cookie.set('token', userData.token, {expires: 1});
          dispatch({ type: actionTypes.SET_USER, payload: userData });
          ownProps.history.push(`/signin`);
        }
      });
  };
};

const loginUser = (payload, ownProps) => {
  return dispatch => {
    return axios
      .post("http://localhost:3001/user/login", payload)
      .then(response => {
        if (response.status === 200) {
          const userData = response.data;
          cookie.set('token', userData.token, {expires: 1});
          dispatch({ type: actionTypes.SET_USER, payload: userData });
          if (userData.type === "Owner") {
            ownProps.history.push(`/${userData.id}/account`);
          } else {
            ownProps.history.push(`/${userData.id}/search`);
          }
        }
      }).catch(err => {
        toast.error("Invalid credentials");
      })
  };
};
//TODO: test user update as code updated
const updateUser = (payload) => {
    return dispatch => {
        return axios.put(`http://localhost:3001/user/update/${payload.id}`, payload)
        .then(response => {
            if(response.status === 200) {
                const userData = response.data.user;
                userData.valid_update = true;
                dispatch({ type: actionTypes.SET_USER, payload: userData });
                if (userData.type === "Owner") {
                  const restaurantData = response.data.restaurant;
                  dispatch({ type: actionTypes.SET_RESTAURANT, payload: restaurantData });
                }
                toast.success("Updated");
            }
        });
    }
}

const getUser = (payload) => {
  return dispatch => {
    return axios.get(`http://localhost:3001/user/get/${payload.user_id}`)
    .then(response => {
      if(response.status === 200) {
        const userData = response.data;
        dispatch({ type: actionTypes.SET_USER, payload: userData });
    }
    });
  }
}
const uploadProfileImage = (payload) => {
  return dispatch => {
      return axios.post(`http://localhost:3001/user/upload/image`,payload)
      .then(response => {
          if(response.status === 200) {
              dispatch({ type: actionTypes.SET_PROFILE_IMAGE, payload: response.data});
          }
      });
  }
}
export { addUser, loginUser, updateUser, getUser, uploadProfileImage};
