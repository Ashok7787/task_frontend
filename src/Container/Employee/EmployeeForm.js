import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card } from "@mui/material";
import { createUser } from "./EmployeeAction";


const validationSchema = Yup.object({
    first_name: Yup.string("Enter your FirstName")
    .required("FirstName is required"),
    last_name: Yup.string("Enter your LastName")
    .required("LastName is required"),
    salary: Yup.string("Enter your salary")
    .required("Salary is required"),
});

function EmployeeForm(props) {
    
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const onSubmit = (data) => {
        console.log(data);
        props.createUser(data);
    };
   
    return (
        <>
            <Card className="p-5 flex flex-col">



                <div className="flex flex-col justify-center w-full">
                    <p className=" text-2xl font-bold">
                        Create New Employee
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                        <Button type="submit" variant="contained" color="primary">
                        Create
                    </Button></div>
                    
                </form>



            </Card>
        </>
    );
}

const mapStateToProps = ({ employee }) => ({});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({createUser}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
