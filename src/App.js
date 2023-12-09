
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Container/Home';
import EditEmployeeForm from './Container/Employee/EditEmployeeForm';

function App() {

  return (
    <div className="p-2 bg-gray-100">

      <Routes>
        <Route element={<Home />} path={`/`} />
        <Route element={<EditEmployeeForm />} path={`/edit_employee/:id`} />
      </Routes>
    </div>
  );
}


export default App;
