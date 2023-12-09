import axios from "axios";
import { API_URL } from "../../Config/Auth";
import * as types from "./EmployeeActionTypes";


export const createUser = (data) => (dispatch) => {
    dispatch({
      type: types.CREATE_EMPLOYEE_REQUEST,
    });
    axios
      .post(`${API_URL}/employees`, data)
      .then((res) => {
        console.log("otp",res.data);
        dispatch(getEmployeeList());
        dispatch({
          type: types.CREATE_EMPLOYEE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err && err.response && err.response.data);
  
        dispatch({
          type: types.CREATE_EMPLOYEE_FAILURE,
          payload: err,
        });
      });
  };
  
  export const getEmployeeList = (data) => (dispatch) => {
    dispatch({
      type: types.GET_EMPLOYEE_REQUEST,
    });
    axios
      .get(`${API_URL}/employees`, data)
      .then((res) => {
        dispatch({
          type: types.GET_EMPLOYEE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err && err.response && err.response.data);
  
        dispatch({
          type: types.GET_EMPLOYEE_FAILURE,
          payload: err,
        });
      });
  };

  export const deleteEmployee = (id) => (dispatch) => {
    dispatch({
      type: types.DELETE_EMPLOYEE_REQUEST,
    });
    axios
      .delete(`${API_URL}/employees/${id}`)
      .then((res) => {
        dispatch(getEmployeeList());
        dispatch({
          type: types.DELETE_EMPLOYEE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err && err.response && err.response.data);
  
        dispatch({
          type: types.DELETE_EMPLOYEE_FAILURE,
          payload: err,
        });
      });
  };

  export const getEmployeeDetailsById = (id) => (dispatch) => {
    dispatch({
      type: types.GET_EMPLOYEE_DETAILS_REQUEST,
    });
    axios
      .get(`${API_URL}/employees/${id}`, )
      .then((res) => {
        dispatch({
          type: types.GET_EMPLOYEE_DETAILS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err && err.response && err.response.data);
  
        dispatch({
          type: types.GET_EMPLOYEE_DETAILS_FAILURE,
          payload: err,
        });
      });
  };

  export const setSpecificStateNull = () => ({
    type: types.GET_EMPLOYEE_DETAILS_REQUEST,
  });