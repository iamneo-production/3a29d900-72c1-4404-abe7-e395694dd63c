import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admincandidates from './Admincandidates.jsx'
import Admindashboard from './Admindashboard.jsx';
import Admineditcandidates from './Admineditcandidates.jsx';
import Admineditopenings from './Admineditopenings.jsx';
import Report from './AdminReport.jsx';
import Adminnavigation from "./Adminnavigation.jsx";
import AdminComplaint from './Admincomplaint.jsx';
import Addadmin from './Addadmin.jsx';

function AdminBaseComponent() {
    return (
        <div>
            <Adminnavigation/>
            
            <Routes>
                <Route path='dashboard' element={<Admindashboard />}></Route>
                <Route path='candidates' element={<Admincandidates />} />
                <Route path='Editcandidates' element={<Admineditcandidates />} />
                <Route path='Editopenings' element={<Admineditopenings />} />
                <Route path= 'Complaints' element ={<AdminComplaint/>} />
                <Route path= 'add' element ={<Addadmin/>} />
                <Route path='Report' element={<Report />} />
            </Routes>
        </div>
    )
}

export default AdminBaseComponent;