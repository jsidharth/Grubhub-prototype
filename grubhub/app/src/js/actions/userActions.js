import actionTypes from "../constants/index";
import axios from "axios";

const addUser = payload => {
  return dispatch => {
    return axios
      .post("http://localhost:3001/user/register", payload)
      .then(response => {
        if (response.status === 200) {
          const userData = response.data;
          dispatch({ type: actionTypes.SET_USER, payload: userData });
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
          dispatch({ type: actionTypes.SET_USER, payload: userData });
          if (userData.type === "Owner") {
            ownProps.history.push(`/${userData.id}/account`);
          } else {
            ownProps.history.push(`/${userData.id}/account`);
          }
        }
      });
  };
};

const updateUser = (payload) => {
    return dispatch => {
        console.log(payload);
        return axios.put(`http://localhost:3001/user/update/${payload.id}`, payload)
        .then(response => {
            if(response.status === 200) {
                const userData = response.data.user;
                userData.valid_update = true;
                const restaurantData = response.data.restaurant;
                console.log(response.data)
                dispatch({ type: actionTypes.SET_USER, payload: userData });
                dispatch({ type: actionTypes.SET_RESTAURANT, payload: restaurantData });
            }
        })
    }
}
export { addUser, loginUser, updateUser};
