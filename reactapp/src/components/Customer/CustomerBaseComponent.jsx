import React from 'react';
import { Routes ,Route}  from 'react-router-dom';
import Customerdashboard from './Customerdashboard.jsx';
import Customeraddjob from './Customeraddjob';
import Customerviewappliedjobs from './Customerviewappliedjobs';
import Review from './Reviews';
import Customernavigation from './Customernavigation';
import Jobseekerapplyjob from '../Jobseeker/Jobseekerapplyjob.jsx';
import Customerprofile from './Customerprofile.jsx';

function CustomerMain() {
    return (
        <div>
            <Customernavigation />
            <Routes>
                <Route  path='dashboard' element={<Customerdashboard />} />
                <Route  path='viewAppliedCandidates' element={<Customerviewappliedjobs />} />
                <Route  path='addJob' element={<Customeraddjob />} />
                <Route  path='Review' element={<Review />} />
                <Route  path='profile' element={<Customerprofile />} />
                <Route  path='applyJob' element={<Jobseekerapplyjob />} />      
            </Routes>
        </div>
    );
}

export default CustomerMain;