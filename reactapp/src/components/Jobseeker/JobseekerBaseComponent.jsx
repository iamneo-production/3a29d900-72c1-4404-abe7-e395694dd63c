import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Jobseekerapplyjob from './Jobseekerapplyjob';
import Jobseekerappliedjob from './Jobseekerappliedjob';
import Jobseekerdashboard from './Jobseekerdashboard';
import Jobseekernavigation from "./Jobseekernavigation";
import Jobseekerprofile from './Jobseekerprofile';
import JobseekerReviews from './JobseekerReviews';

function JobseekerBaseComponent() {
    return (
        <div>
             <Jobseekernavigation />
            <Routes>
                <Route path='applyJob' element={<Jobseekerapplyjob />} />
                <Route path='appliedJob' element={<Jobseekerappliedjob />} />
                <Route path="dashboard" element={<Jobseekerdashboard />} />
                <Route path = "profile" element={<Jobseekerprofile/>} />
                <Route path ='reviews' element = {<JobseekerReviews/>} />
            </Routes>
        </div>
    )
}

export default JobseekerBaseComponent;