import { combineReducers } from "redux";
import { employeeReducer } from "../Container/Employee/EmployeeReducer";

const appReducer = combineReducers({
 employee: employeeReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    sessionStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
