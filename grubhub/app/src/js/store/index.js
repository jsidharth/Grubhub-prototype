import { createStore, applyMiddleware, compose } from "redux";
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import rootReducer from "../reducers/index.js";
import thunk from "redux-thunk";
import axios from 'axios';
import cookie from 'js-cookie';
import {toast} from 'react-toastify';

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
      return response;
 }, 
 function (error) {
  if (error && error.response.status === 401) {
      toast.error('Unauthorized!');
  } else if(error && error.response.status === 500) {
      const msg = error.response.data.message ? error.response.data.message : 'Oops! Something went wrong!';
      toast.error(msg);
  }
  return Promise.reject(error);
});

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = storage.reducer(rootReducer);
const engine = createEngine('my-save-key');
const middleware = storage.createMiddleware(engine);
const store = createStore(reducer, storeEnhancers(applyMiddleware(thunk, middleware)));
const load = storage.createLoader(engine);
load(store)
  .then((newState) => console.log('Loaded state:', newState))
  .catch(() => console.log('Failed to load previous state'));

export default store;
