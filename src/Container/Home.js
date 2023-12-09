import React, { useState } from 'react'
import EmployeeForm from './Employee/EmployeeForm'
import EmployeeTable from './Employee/EmployeeTable'
import EditEmployeeForm from './Employee/EditEmployeeForm';

function Home() {
  const [update,setUpdate] = useState(false);
  if(!update){
    sessionStorage.removeItem("employee_id")
  }
  const handelFormUpdate = () => {
    setUpdate(true);
  }
  const handelFormUpdateCancel = () => {
    setUpdate(false);
  }
  return (
    <div className=' flex flex-col space-y-2'>
      {!update ?
        <EmployeeForm /> : <EditEmployeeForm handelFormUpdate={handelFormUpdate} handelFormUpdateCancel={handelFormUpdateCancel}/> }
        <EmployeeTable handelFormUpdate={handelFormUpdate}/>
    </div>
  )
}

export default Home