import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './admin.css';
import axios from '../../axios.jsx';
import {toast,ToastContainer} from 'react-toastify';


function Admineditopenings() {
    const [joberrors, setjoberrors] = useState({});
    const [jobDescription, setjobDescription] = useState('');
    const [jobLocation, setjobLocation] = useState('');
    const [toDate, settoDate] = useState('');
    const [fromDate, setfromDate] = useState('');
    const [wagePerDay, setwagePerDay] = useState('');
    const [phoneNumber, setphoneNumber] = useState([]);
    const [jobId, setjobId] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = () => {
        const { id } = location.state;
        const job_data = (id);
        if (job_data) {
            setjobId(job_data.jobId);
            setjobDescription(job_data.jobDescription);
            setjobLocation(job_data.jobLocation);
            const from_date = new Date(job_data.fromDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
            const to_date = new Date(job_data.toDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
            setfromDate(from_date);
            settoDate(to_date);
            setwagePerDay(job_data.wagePerDay);
            setphoneNumber(job_data.phoneNumber);
        }
    };


    const Validation = () => {
        const joberrors = {};

        if (jobDescription === "") {
            joberrors.jobDescription = "job description is Required";
        }

        if (jobLocation === "") {
            joberrors.jobLocation = "Location is Required";
        }
        if (toDate === "") {
            joberrors.toDate = "toDate field is required";
        }
        if (fromDate === "") {
            joberrors.fromDate = "fromDate field is required";
        }
        if (wagePerDay === "") {
            joberrors.wagePerDay = "this field is required";
        }

        if (phoneNumber === "") {
            joberrors.phoneNumber = "Phone Number is Required";
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            joberrors.phoneNumber = 'Invalid mobile number';
        }

        setjoberrors(joberrors);
        return Object.keys(joberrors).length === 0;
    };

    const jobhandleValidation = (event) => {
        event.preventDefault();
        
        if (Validation()) {
            const data = {

                jobId: jobId,
                jobDescription: jobDescription,
                jobLocation: jobLocation,
                fromDate: fromDate,
                toDate: toDate,
                wagePerDay: wagePerDay,
                phoneNumber: phoneNumber
            }
            
            // Form is valid, you can proceed with form submission or further processing
            axios.put(`admin/editJob/${jobId}`, data).then((response) => {
                if (response.data === "Job edited") {
                    toast.success("Job updated");
                    navigate("/Admin/dashboard");
                } else {
                    toast.error(response.data);
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            setjoberrors(Validation);
        }
    };

    const minfromDate = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');

    const ToDate = new Date(fromDate);
    ToDate.setDate(ToDate.getDate() + 1);
    const minToDate = ToDate.toLocaleDateString('en-CA').split('/').reverse().join('-');

    return (
        <div>
            <br/>
            <div className="admineditjob">
                <ToastContainer/>
                <Form >
                    <Row className="adm_editrow">
                        <Col >
                            <Form.Group>
                                <Form.Label><strong>JobDescription</strong></Form.Label>
                                <Form.Control type="text" id="editJobDescription" placeholder="Enter the Job Description" value={jobDescription} onChange={(e) => setjobDescription(e.target.value)} />
                                {joberrors.jobDescription && <p style={{ color: 'red' }}> {joberrors.jobDescription}</p>}
                            </Form.Group>
                        </Col>
                        <Col className="adm_editcol">
                            <Form.Group>
                                <Form.Label><strong>JobLocation</strong></Form.Label>
                                <Form.Control type="text" id="editJobLocation" placeholder="Enter the Job Location" value={jobLocation} onChange={(e) => setjobLocation(e.target.value)} />
                                {joberrors.jobLocation && <p style={{ color: 'red' }}>{joberrors.jobLocation}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="adm_editrow">
                        <Col>
                            <Form.Group>
                                <Form.Label><strong>From Date</strong></Form.Label>
                                <Form.Control type="date" id="editFromDate" min={minfromDate} value={fromDate} onChange={(e) => setfromDate(e.target.value)} required />
                                {joberrors.fromDate && <p style={{ color: 'red' }}>{joberrors.fromDate}</p>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>To Date</strong></Form.Label>
                                <Form.Control type="date" id="editToDate" min={minToDate} value={toDate} onChange={(e) => settoDate(e.target.value)} required />
                                <span className="validity"></span>
                                {joberrors.toDate && <p style={{ color: 'red' }}>{joberrors.toDate}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="adm_editrow">
                        <Col>
                            <Form.Group>
                                <Form.Label><strong>WageForDay</strong></Form.Label>
                                <Form.Control type="text" id="editWageForDay" placeholder="Enter the Wage for day" value={wagePerDay} onChange={(e) => setwagePerDay(e.target.value)} />
                                {joberrors.wagePerDay && <p style={{ color: 'red' }}>{joberrors.wagePerDay}</p>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label><strong>PhoneNumber</strong></Form.Label>
                                <Form.Control type="text" id="editPhoneNumber" placeholder="Enter the Phone Number" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} />
                                {joberrors.phoneNumber && <p style={{ color: 'red' }}>{joberrors.phoneNumber}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <br /><br />
                    <Row className="adm_editrow">
                        <div className="d-flex justify-content-end">
                            <Button variant="dark" id="updateButton" style={{ width: "130px" }} onClick={jobhandleValidation}> Update</Button>
                        </div>
                    </Row>
                </Form>

            </div>
        </div>
    );
}

export default Admineditopenings;