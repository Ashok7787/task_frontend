import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Card } from "@mui/material";
import { getEmployeeDetailsById,getEmployeeList, setSpecificStateNull } from "./EmployeeAction";
import { useNavigate, useParams } from "react-router-dom";
import * as types from "./EmployeeActionTypes";
import { API_URL } from "../../Config/Auth";
import axios from "axios";



function EditEmployeeForm(props) {
    const navigate = useNavigate();
    const employee_id= sessionStorage.getItem("employee_id");
    const [employeeData,setEmployeeData] = useState(null);
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name:props.employeeDetails.first_name,
            last_name:props.employeeDetails.last_name,
            salary:props.employeeDetails.salary,
            id:props.employeeDetails.id,
          },
    });
    
    useEffect(()=>{
        props.setSpecificStateNull();
        props.getEmployeeDetailsById(employee_id);
    },[employee_id,props]);
    console.log("employeeDetails",props.employeeDetails);
    const onSubmit = (data) => {
        console.log(data);
        updateEmployeeDetailsById(data);
    };
      if(props.getEmployeeDetailsForData){
            <h1>Loading....</h1>
           }
           
     const updateEmployeeDetailsById = (data)  => {
        dispatch({
          type: types.UPDATE_EMPLOYEE_DETAILS_REQUEST,
        });
        axios
          .patch(`${API_URL}/employees`,data )
          .then((res) => {
            dispatch(props.getEmployeeList(), props.handelFormUpdate(),
            sessionStorage.removeItem("employee_id"));          
            dispatch({
              type: types.UPDATE_EMPLOYEE_DETAILS_SUCCESS,
              payload: res.data,

            });
          })
          .catch((err) => {
            console.log(err && err.response && err.response.data);
      
            dispatch({
              type: types.UPDATE_EMPLOYEE_DETAILS_FAILURE,
              payload: err,
            });
          });
      };
  
    return (
        <>
            <Card className="p-5 flex flex-col">



                <div className="flex flex-col justify-center w-full">
                    <p className=" text-2xl font-bold">
                        Update Employee Details
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex justify-center "
                >
                    <div className="flex  justify-start gap-2 p-5 w-4/5">
                    <Controller
                        name="first_name"
                        control={control}
                        
                        rules={{ required: "Firstname is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                fullWidth
                                label="Firstname"
                                error={!!errors.first_name}
                                helperText={errors.first_name && errors.first_name.message}
                            />
                        )}
                    />
                    <Controller
                        name="last_name"
                        control={control}
                        
                        rules={{ required: "Lastname is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                fullWidth
                                label="Lastname"
                                error={!!errors.last_name}
                                helperText={errors.last_name && errors.last_name.message}
                            />
                        )}
                    />
                    <Controller
                        name="salary"
                        control={control}
                        
                        rules={{ required: "Salary is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Salary"
                                variant="outlined"
                                fullWidth
                                error={!!errors.salary}
                                helperText={errors.salary && errors.salary.message}
                            />
                        )}
                    />
                    </div>
                    <div className="flex justify-center  p-5 w-1/5">
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update
                    </Button> </div>
                    
                </form>

<div className="w-full flex justify-end">
    <div className="px-5 w-1/5">
    <button onClick={() => props.handelFormUpdateCancel()} className="bg-red-500 w-full text-lg text-white rounded-md p-2 shadow-md"> Cancel</button>
    </div>
    </div>

            </Card>
        </>
    );
}

const mapStateToProps = ({ employee }) => ({
    employeeDetails:employee.employeeDetails,
    getEmployeeDetailsForData: employee.getEmployeeDetailsForData
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({getEmployeeDetailsById,getEmployeeList,setSpecificStateNull}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeeForm);
