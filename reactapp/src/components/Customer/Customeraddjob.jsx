import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Customer.css';
import axios from '../../axios';
import {toast,ToastContainer} from "react-toastify";


function Customeraddjob() {
    const [joberrors, setjoberrors] = useState({});
    const [jobDescription, setjobDescription] = useState('');
    const [jobLocation, setjobLocation] = useState('');
    const [toDate, settoDate] = useState('');
    const [fromDate, setfromDate] = useState('');
    const [wagePerDay, setwagePerDay] = useState('');
    const [phoneNumber, setphoneNumber] = useState([]);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("email");
        setEmail(email);
    }, [])



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
                email: email,
                jobDescription: jobDescription,
                jobLocation: jobLocation,
                fromDate: fromDate,
                toDate: toDate,
                wagePerDay: wagePerDay,
                phoneNumber: phoneNumber
            }
            axios.post('admin/addJob', data).then((result) => {
                if (result.data === "Job added") {
                    toast.success("Job is added");
                    navigate("/customer/dashboard");
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
        <div className="customerapplyjob">
            <ToastContainer/>
            <br />
            <div className="cus_apply">
                <Form onSubmit={jobhandleValidation}>
                    <Row className="customerrow">
                        <Col>
                            <Form.Group>
                                <Form.Label><b>JobDescription</b></Form.Label>
                                <Form.Control type="text" id="enterJobDescription" placeholder="Enter the Job Description" value={jobDescription} onChange={(e) => setjobDescription(e.target.value)} />
                                {joberrors.jobDescription && <p style={{ color: 'red' }}> {joberrors.jobDescription}</p>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label><b>JobLocation</b></Form.Label>
                                <Form.Control type="text" id="enterJobLocation" placeholder="Enter the Job Location" value={jobLocation} onChange={(e) => setjobLocation(e.target.value)} />
                                {joberrors.jobLocation && <p style={{ color: 'red' }}>{joberrors.jobLocation}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="customerrow">
                        <Col>
                            <Form.Group>
                                <Form.Label><b>From Date</b></Form.Label>
                                <Form.Control type="date" id="enterFromDate" min={minfromDate} value={fromDate} onChange={(e) => setfromDate(e.target.value)} required />
                                {joberrors.fromDate && <p style={{ color: 'red' }}>{joberrors.fromDate}</p>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label><b >To Date</b></Form.Label>
                                <Form.Control type="date" id="enterToDate" min={minToDate} value={toDate} onChange={(e) => settoDate(e.target.value)} required />
                                <span className="validity"></span>
                                {joberrors.toDate && <p style={{ color: 'red' }}>{joberrors.toDate}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="customerrow">
                        <Col>
                            <Form.Group>
                                <Form.Label><b>WageForDay</b></Form.Label>
                                <Form.Control type="text" id="enterWageForDay" placeholder="Enter the Wage for day" value={wagePerDay} onChange={(e) => setwagePerDay(e.target.value)} />
                                {joberrors.wagePerDay && <p style={{ color: 'red' }}>{joberrors.wagePerDay}</p>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label><b>PhoneNumber</b></Form.Label>
                                <Form.Control type="text" id="enterPhoneNumber" placeholder="Enter the Phone Number" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} />
                                {joberrors.phoneNumber && <p style={{ color: 'red' }}>{joberrors.phoneNumber}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row className="customerrow">
                        <div className="d-flex justify-content-end">
                            <Button variant="light" id="applyButton" style={{ width: "130px" }} onClick={jobhandleValidation}>Add job</Button>
                        </div>
                    </Row>
                </Form>

            </div>
        </div>
    );
}

export default Customeraddjob;