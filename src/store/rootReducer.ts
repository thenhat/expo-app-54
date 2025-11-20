import { combineReducers } from "redux";
import storeReducer from "./slice/storeSlice";
import noticesSlice from "./slice/noticesSlice";
import globalReducer from "./slice/globalSlice";

const rootReducer = combineReducers({
  store: storeReducer,
  global: globalReducer,
  notices: noticesSlice,
});

export default rootReducer;
