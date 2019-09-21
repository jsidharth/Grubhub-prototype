import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index.js";
import thunk from "redux-thunk";
import axios from 'axios';
import cookie from 'react-cookies';

axios.interceptors.request.use(function (config) {
    const token = cookie.load('grubhubCookie');
    if(token) {
        config.headers.Authorization =  `JWT ${token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;
