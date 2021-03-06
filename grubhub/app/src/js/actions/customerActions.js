import actionTypes from "../constants/index";
import axios from "axios";
import { toast } from "react-toastify";

const getSearchResults = (payload, ownProps) => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/item/customer/search`, {
        params: {
          key: payload.search
        }
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_SEARCH_RESULTS,
            payload: response.data
          });
          ownProps.history.push("/searchresults");
        }
      });
  };
};

const getRestaurantDetails = payload => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/restaurant/detail/${payload.restaurant_id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_CUSTOMER_SELECTED_RESTAURANT,
            payload: response.data
          });
        }
      });
  };
};

const addToCart = payload => {
  return dispatch => {
    dispatch({ type: actionTypes.ADD_TO_CART, payload });
  };
};

const placeOrder = (payload, ownProps) => {
  return dispatch => {
    console.log("here", payload);
    return axios
      .post("http://localhost:3001/order/confirm", payload)
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: actionTypes.CLEAR_CART, payload: response.data });
          ownProps.history.replace(`/${payload.user_id}/order`);
          toast.success("Order placed!");
        }
      });
  };
};

export { getSearchResults, getRestaurantDetails, addToCart, placeOrder };
