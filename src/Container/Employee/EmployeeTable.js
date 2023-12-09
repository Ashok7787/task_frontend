import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Card } from "@mui/material";
import {  deleteEmployee, getEmployeeList } from "./EmployeeAction";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function EmployeeTable(props) {
    const pdfRef = useRef();
    useEffect(() => {
        props.getEmployeeList();
        
    }, []);

const handleEditEmployee = (id)=>{   
    sessionStorage.setItem("employee_id",id);
    props.handelFormUpdate();
    // navigate(`/edit_employee/${id}`);
    
}

    const downloadPDF = async () => {
        const input = pdfRef.current;

        if (input) {
            const canvas = await html2canvas(input);
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');

            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('dynamic_data.pdf');
        }
    };
    const exportToExcel = (data, filename) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, filename);
    };

    const yourData = props.employeesList;

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'first_name',
            headerName: 'First name',
            width: 150,
            sortable: true,
            // editable: true,
        },
        {
            field: 'last_name',
            headerName: 'Last name',
            width: 150,
            sortable: true,
            // editable: true,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            sortable: true,
            type: 'number',
            width: 110,
            // editable: true,
        },
    
        {
            headerName: 'Action',
            width: 300,
            type: 'actions',           
            renderCell: (params) => {
                  return  <div className="flex gap-1">
                  <Button 
                  onClick={() => handleEditEmployee(params.row.id)}
                  >
                    Edit
                  </Button>
                  <Button 
                  onClick={() => props.deleteEmployee(params.row.id)}
                  >
                    Delete
                  </Button>
                </div>
            },
        },
    ];

    
    return (
        <>
            <Card className="p-5 flex flex-col">
                <div className=" flex justify-end gap-2">
                    <Button onClick={() => exportToExcel(yourData, 'data.xlsx')} >Download Excel</Button>
                    <Button onClick={downloadPDF}>Download PDF</Button>
                </div>
                <div ref={pdfRef} className=" hidden">

                    {/* Render your dynamic data as a list or any other HTML structure */}
                    <ul>
                        {yourData.map((item, index) => (
                            <div className='flex gap-2 w-full'>
                                <li key={index}>{item.id}</li>
                                <li key={index}>{item.first_name}</li>
                                <li key={index}>{item.last_name}</li>
                                <li key={index}>{item.salary}</li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        rows={yourData}
                        columns={columns}
                        pageSize={5}
                        // initialState={{
                        //     pagination: {
                        //         paginationModel: { page: 0, pageSize: 5 },
                        //     },
                        // }}
                        // pageSizeOptions={[5, 10]}
                       // checkboxSelection
                       checkboxSelection={false}
                    />
                </div>
            </Card>
        </>
    );
}

const mapStateToProps = ({ employee }) => ({
    employeesList: employee.employeesList,
    getEmployeeList: employee.getEmployeeList,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ getEmployeeList,deleteEmployee }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);
