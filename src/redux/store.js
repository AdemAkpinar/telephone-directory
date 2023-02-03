import { createStore, combineReducers } from "redux";

import personsReducer from "./reducers/personsReducer";
import groupsReducer from "./reducers/groupsReducer";

const rootReducer = combineReducers({
  personsState: personsReducer,
  groupsState: groupsReducer,
});

const store = createStore(rootReducer);

export default store;
