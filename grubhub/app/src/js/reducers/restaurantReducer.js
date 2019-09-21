import actionTypes from '../constants/index'
const intialState = {
    id: "",
    name: "",
    address: "",
    zipcode: "",
    image: "",
    cuisine: ""
};

const restaurantReducer = (state = intialState, action) => {
    switch (action.type) {
      case actionTypes.SET_RESTAURANT:
          let newState = action.payload;
          return Object.assign({}, state, newState);
      default:
          //console.log('Here')
        break;
    }
    return state;
  };
export default restaurantReducer;