import actionTypes from "../constants/index";
import axios from "axios";

const getRestaurant = payload => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/restaurant/${payload.user_id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_RESTAURANT,
            payload: response.data
          });
        }
      });
  };
};

const getOrders = payload => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/order/restaurant/${payload.id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_OWNER_ORDERS,
            payload: response.data
          });
        }
      });
  };
};

const changeStatus = payload => {
  return dispatch => {
    return axios
      .put(`http://localhost:3001/order/update/${payload.id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_OWNER_ORDERS,
            payload: response.data
          });
        }
      });
  };
};

const getOrderDetail = payload => {
    return dispatch => {
        return axios
          .get(`http://localhost:3001/order/${payload.order_id}`)
          .then(response => {
            if (response.status === 200) {
              dispatch({
                type: actionTypes.SET_ORDER_DETAIL,
                payload: response.data
              });
            }
          });
      };
}
export { getRestaurant, getOrders, changeStatus, getOrderDetail};
