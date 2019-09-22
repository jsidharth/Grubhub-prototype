import { combineReducers } from "redux";
import user from "./userReducer";
import restaurant from "./restaurantReducer";
import order from "./orderReducer";
const rootReducer = combineReducers({
  user,
  restaurant,
  order
});
export default rootReducer;
