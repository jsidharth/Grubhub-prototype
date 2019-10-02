import actionTypes from './../constants/index';
const initialState = {
    id: '',
    name: '',
    description: '',
    section: '',
    rate: '',
    image: ''
};

const itemReducer = (state=initialState, action) => {
    let newState;
    switch(action.type) {
        case actionTypes.SET_ITEM:
            newState = action.payload;
            return Object.assign({}, state, newState);
        case actionTypes.CLEAR_ITEM:
            newState = initialState;
            return Object.assign({}, state, newState);
        case actionTypes.SET_ITEM_IMAGE:
            newState = action.payload;
            return Object.assign({}, state, newState);
        default:
            break;
    }
    return state;
}

export default itemReducer;