import actionTypes from './../constants/index';
const initialState = {
    search_results: [],
    current_restaurant: {},
    cart: []
}

const customerReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type) {
        case actionTypes.SET_SEARCH_RESULTS:
            newState = action.payload;
            return Object.assign({}, state, newState);
        case actionTypes.SET_CUSTOMER_SELECTED_RESTAURANT:
            newState = action.payload;
            return Object.assign({}, state, newState);
        case actionTypes.ADD_TO_CART:
                newState = action.payload;
                return Object.assign({}, state, newState);
        case actionTypes.CLEAR_CART:
                newState.cart = [];
                return Object.assign({}, state, newState);
        default:
            break;
    }
    return state;
}

export default customerReducer;