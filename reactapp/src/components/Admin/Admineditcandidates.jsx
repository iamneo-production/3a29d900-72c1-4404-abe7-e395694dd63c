import React, { useEffect, useState } from "react";
import './admin.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../axios.jsx';
import {toast,ToastContainer} from "react-toastify";


function Admineditcandidates() {
    const [id, setid] = useState("");
    const [personName, setpersonName] = useState("");
    const [personAddress, setpersonAddress] = useState("");
    const [personPhone, setpersonPhone] = useState("");
    const [personEmail, setpersonEmail] = useState("");
    const [personExp, setpersonExp] = useState("");
    const [personStatus, setpersonStatus] = useState("");
    const [jobmodel, setjobmodel] = useState({});
    const [errors, seterrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        getApiData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const getApiData = () => {
        const { item } = location.state;
        const id = (item.personId);
        axios.get(`jobseeker/getAppliedjobs/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            const api = result.data;
            if (api.length > 0) {
                const api_data = api[0];
                setid(api_data.id);
                setpersonName(api_data.personName);
                setpersonEmail(api_data.personEmail);
                setpersonAddress(api_data.personAddress);
                setpersonExp(api_data.personExp);
                setpersonPhone(api_data.personPhone);
                setpersonStatus(api_data.personStatus);
                setjobmodel(api_data.jobModel);
                
            }
        }).catch((error) => {
            alert(error);
        });
    };

    const handleValidation = (event) => {
        event.preventDefault();

        if (Validation()) {
            const data = {
                id: id,
                personName: personName,
                personAddress: personAddress,
                personExp: personExp,
                personPhone: personPhone,
                personEmail: personEmail,
                personStatus: personStatus,
                jobModel: jobmodel
            }
            axios.put(`jobseeker/editProfile/${id}`, data)
                .then((result) => {
                    if (result.data === "Profile updated") {
                        toast.success("Profile updated");
                        navigate("/Admin/candidates");
                    } else {
                        toast.error(result.data);
                    }
                }).catch((error) => {
                    console.log(error);
                })
        } else {
            seterrors(Validation);
        }
    };



    const Validation = () => {
        const errors = {};

        if (personName === "") {
            errors.personName = "Name is Required";
        }

        if (personEmail === "") {
            errors.personEmail = "Email is Required";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(personEmail)) {
            errors.personEmail = 'Invalid email address';
        }

        if (personAddress === "") {
            errors.personAddress = "Address is Required";
        }

        if (personPhone === "") {
            errors.personPhone = "Phone Number is Required"
        } else if (!/^\d{10}$/.test(personPhone)) {
            errors.personPhone = 'Invalid mobile number';
        }

        if (personExp === "") {
            errors.personExp = "Experience is Required";
        }

        seterrors(errors);
        return Object.keys(errors).length === 0;
    }

    return (
        <div >
            <br />
            <div className="admin_editperson">
            <ToastContainer/>
                    <Form >
                        <Row className="candidate_row">
                            <Col>
                                <Form.Group>
                                    <Form.Label><b>Name</b></Form.Label>
                                    <Form.Control type="text" id="editName" placeholder="Enter Name" size="lg" value={personName} onChange={(e) => setpersonName(e.target.value)} />
                                    {errors.personName && <p style={{ color: "red" }}>{errors.personName}</p>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label><b>Address</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your address" id="editAddress" size="lg" value={personAddress} onChange={(e) => setpersonAddress(e.target.value)} />
                                    {errors.personAddress && <p style={{ color: "red" }}>{errors.personAddress}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row className="candidate_row">
                            <Col>
                                <Form.Group>
                                    <Form.Label><b>Phone Number</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your phone number" id="editPhoneNumber" size="lg" value={personPhone} onChange={(e) => setpersonPhone(e.target.value)} />
                                    {errors.personPhone && <p style={{ color: "red" }}>{errors.personPhone}</p>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label><b>Email</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your email" id="editEmail" size="lg" value={personEmail} onChange={(e) => setpersonEmail(e.target.value)} />
                                    {errors.personEmail && <p style={{ color: "red" }}>{errors.personEmail}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row className="candidate_row">
                            <Col >
                                <Form.Group>
                                    <Form.Label><b>Experience</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your year of experience" id="editYearOfExperience" size="lg" value={personExp} onChange={(e) => setpersonExp(e.target.value)} />
                                    {errors.personExp && <p style={{ color: "red" }}>{errors.personExp}</p>}
                                </Form.Group>
                            </Col>
                            <Col></Col>
                        </Row>
                        <br />
                        <Row className="candidate_row">
                            <div className="d-flex justify-content-end">
                                <Button variant="dark" id="updateButton" onClick={handleValidation} style={{ width: "130px" }}> Update</Button>
                            </div>
                        </Row>
                    </Form>
                </div>
            </div>
    );
}

export default Admineditcandidates;