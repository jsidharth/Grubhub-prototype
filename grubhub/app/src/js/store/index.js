import { createStore, applyMiddleware, compose } from "redux";
import {Redirect} from "react-router-dom";
import rootReducer from "../reducers/index.js";
import thunk from "redux-thunk";
import axios from 'axios';
import cookie from 'js-cookie';

axios.interceptors.request.use( (config) => {
    const token = cookie.get('token');
    if(token) {
        config.headers.Authorization =  `JWT ${token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    return response
 }, 
 function (error) {
  if (error.response.status === 401) {
      window.location.href = "/signin"
      return Promise.reject(error);
  } else {
    window.location.href = "/signin"
    //TODO: ADD toaster for error
  }
  return Promise.reject(error);
});
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;
