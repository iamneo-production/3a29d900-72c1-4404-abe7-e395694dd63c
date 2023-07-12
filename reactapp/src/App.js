import React from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import PrivateRoute from './auth/PrivateRoutes.jsx';
import AdminBaseComponent from './components/Admin/AdminBaseComponents.js';
import CustomerBaseComponent from './components/Customer/CustomerBaseComponent.js';
import JobseekerBaseComponent from './components/Jobseeker/JobseekerBaseComponent.jsx';


function App() {
  return (

    <div>
      <Router>
        <Routes>
          <Route path='/Admin/*' element={<PrivateRoute element={<AdminBaseComponent />} authRole="Admin" allowedRoles={['Admin']} />} />
          <Route path="/customer/*" element={<PrivateRoute element={<CustomerBaseComponent />} authRole="User" allowedRoles={['User']} />} />
          <Route path='/jobseeker/*' element={<PrivateRoute element={<JobseekerBaseComponent />} authRole="Jobseeker" allowedRoles={['Jobseeker']}  />} />
          
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>

  );
}
export default App;
