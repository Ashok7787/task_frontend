import * as types from "./EmployeeActionTypes";
const initialState = {
 

  creatingEmployee: false,
  creatingEmployeeError: false,

  getEmployeeList: false, 
  getEmployeeListError: false,
  employeesList:[],
  
  deleteEmployee: false,
   deleteEmployeeError: false,
   

   getEmployeeDetailsForData: false,
    getEmployeeDetailsForDataError: false,
    employeeDetails:{},

   updateEmployee: false,
    updateEmployeeError: false
};
export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
   

    case types.CREATE_EMPLOYEE_REQUEST:
      return { ...state, creatingEmployee: true };
    case types.CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        creatingEmployee: false,
      };
    case types.CREATE_EMPLOYEE_FAILURE:
      return { ...state, getEmployeeList: false, getEmployeeListError: true };

      case types.GET_EMPLOYEE_REQUEST:
      return { ...state, getEmployeeList: true };
    case types.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        getEmployeeList: false,
        employeesList: action.payload,
      };
    case types.GET_EMPLOYEE_FAILURE:
      return { ...state, getEmployeeList: false, getEmployeeListError: true };

      case types.DELETE_EMPLOYEE_REQUEST:
        return { ...state, deleteEmployee: true };
      case types.DELETE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          deleteEmployee: false,
        };
      case types.DELETE_EMPLOYEE_FAILURE:
        return { ...state, deleteEmployee: false, deleteEmployeeError: true };

        case types.GET_EMPLOYEE_DETAILS_REQUEST:
          return { ...state, getEmployeeDetailsForData: true };
        case types.GET_EMPLOYEE_DETAILS_SUCCESS:
          return {
            ...state,
            getEmployeeDetailsForData: false,
            employeeDetails: action.payload,
          };
        case types.GET_EMPLOYEE_DETAILS_FAILURE:
          return { ...state, getEmployeeDetailsForData: false, getEmployeeDetailsForDataError: true };
    
          case types.UPDATE_EMPLOYEE_DETAILS_REQUEST:
            return { ...state, updateEmployee: true };
          case types.UPDATE_EMPLOYEE_DETAILS_SUCCESS:
            return {
              ...state,
              updateEmployee: false,
            };
          case types.UPDATE_EMPLOYEE_DETAILS_FAILURE:
            return { ...state, updateEmployee: false, updateEmployeeError: true };
    

    default:
      return state;
  }
};
