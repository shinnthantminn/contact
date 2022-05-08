import { applyMiddleware, combineReducers, createStore } from "redux";
import ToggleReducers from "./Reducers/ToggleReducers";
import thunk from "redux-thunk";
import DataReducer from "./Reducers/DataReducer";
import SearchReducers from "./Reducers/SearchReducers";
import SelectorReducer from "./Reducers/SelectorReducer";
import UserReducers from "./Reducers/UserReducers";

const Reducers = combineReducers({
  Toggle: ToggleReducers,
  Data: DataReducer,
  Search: SearchReducers,
  Select: SelectorReducer,
  Login: UserReducers,
});

export const Store = createStore(Reducers, {}, applyMiddleware(thunk));
