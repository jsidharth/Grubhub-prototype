import actionTypes from "../constants/index";
import axios from "axios";
import { toast } from "react-toastify";

const getRestaurant = payload => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/restaurant/${payload.restaurant_id}`)
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

const getRestaurantOrders = payload => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/order/restaurant/${payload.id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_ORDERS,
            payload: response.data
          });
        }
      });
  };
};

const changeStatus = payload => {
  return dispatch => {
    return axios
      .put(`http://localhost:3001/order/update/${payload.id}`, {
        status: payload.status
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_ORDERS,
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
};

const getMenu = payload => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/restaurant/menu/${payload.restaurant_id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_MENU,
            payload: { menu: response.data }
          });
        }
      });
  };
};

const getCustomerOrders = payload => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/order/customer/${payload.id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_ORDERS,
            payload: response.data
          });
        }
      });
  };
};

const editSection = payload => {
  return dispatch => {
    return axios
      .put("http://localhost:3001/restaurant/menu/section", payload)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_MENU,
            payload: { menu: response.data }
          });
          toast.success("Updated");
        }
      });
  };
};

const deleteSection = payload => {
  return dispatch => {
    return axios
      .put("http://localhost:3001/restaurant/menu/section/delete", payload)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_MENU,
            payload: { menu: response.data }
          });
          toast.success("Deleted");
        }
      });
  };
};

const uploadRestaurantImage = payload => {
  return dispatch => {
    return axios
      .post(
        `http://localhost:3001/restaurant/upload/image/restaurant/${payload.restaurant_id}`,
        payload.data
      )
      .then(response => {
        if (response.status === 200) {
          toast.success("Uploaded");
        }
      });
  };
};

export {
  getRestaurant,
  getRestaurantOrders,
  changeStatus,
  getOrderDetail,
  getMenu,
  getCustomerOrders,
  editSection,
  deleteSection,
  uploadRestaurantImage
};
