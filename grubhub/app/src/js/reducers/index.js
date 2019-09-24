import { combineReducers } from "redux";
import user from "./userReducer";
import restaurant from "./restaurantReducer";
import order from "./orderReducer";
import item from "./itemReducer";
import customer from "./customerReducer";

const rootReducer = combineReducers({
  user,
  restaurant,
  order,
  item,
  customer
});
export default rootReducer;
