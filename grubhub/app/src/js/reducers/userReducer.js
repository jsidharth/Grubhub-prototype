import actionTypes from '../constants/index';
const intialState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  type: "",
  token: "",
  image: "",
  invalid: false
};

const userReducer = (state = intialState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.SET_USER:
        newState = action.payload;
        newState.invalid = false;
        return Object.assign({}, state, newState);
    case actionTypes.SET_INVALID:
        newState = action.payload;
        newState.invalid = true;
        return Object.assign({}, state, newState);
    default:
        //console.log('Here')
      break;
  }
  return state;
};

export default userReducer;
