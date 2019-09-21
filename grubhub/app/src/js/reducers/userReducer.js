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
  valid: false
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
        let newState = action.payload;
        newState.valid = true;
        return Object.assign({}, state, newState);
    default:
        //console.log('Here')
      break;
  }
  return state;
};

export default userReducer;
