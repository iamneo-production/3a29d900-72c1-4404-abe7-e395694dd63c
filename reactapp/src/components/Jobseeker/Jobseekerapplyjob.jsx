import React, { useEffect, useState } from "react";
import './jobseeker.css';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from '../../axios.jsx';
import {toast,ToastContainer} from 'react-toastify';


function Jobseekerapplyjob() {
    
    const[personId,setpersonId] = useState("");
    const[personName,setpersonName] = useState("");
    const[personAddress,setpersonAddress] = useState("");
    const[personPhone,setpersonPhone] = useState("");
    const[personEmail,setpersonEmail] = useState("");
    const[personExp,setpersonExp] = useState("");
    const[errors,seterrors] = useState({}); 
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("email");
        setpersonId(email);
      }, [])

    const location = useLocation();
    const {itemData} = location.state;
    const[jobmodel,setjobmodel] = useState(itemData);
    

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(Validation()){
            const data ={
                personId:personId,
                personName:personName,
                personAddress:personAddress,
                personExp:personExp,
                personPhone:personPhone,
                personEmail:personEmail,
                JobModel: jobmodel
            }
            axios.post('/admin/addprofile',data).then((result)=>{
                if(result.data === "Profile added"){
                 toast.success("Sucessfully applied");
                  navigate("/jobseeker/dashboard");
                  setjobmodel({});
                }else{
                    toast.warning(result.data);
                    navigate("/jobseeker/dashboard");
                }
            }).catch((error) =>{
                console.log(error);
            })
            }
            else{
                seterrors(Validation);
            }
        };
        
    

    const Validation = ()=> {
        const errors = {};

        if(personName === ""){
            errors.personName = "Name is Required";
        }

        if(personEmail === ""){
            errors.personEmail = "Email is Required";
        } else if (!/\S+@\S+\.\S+/.test(personEmail)) {
            errors.personEmail = 'Invalid email address';
        }

        if(personAddress === ""){
            errors.personAddress = "Address is Required";
        }

        if(personPhone === ""){
            errors.personPhone = "Phone Number is Required"
        }else if (!/^\d{10}$/.test(personPhone)) {
            errors.personPhone = 'Invalid mobile number';
        }

        if(personExp === ""){
            errors.personExp = "Experience is Required";
        }
        
        seterrors(errors);
        return Object.keys(errors).length === 0;
    }

    return (
         
            <div className="applyjob">
                <ToastContainer/>
                <div>
                    <Form >
                        <Row  className="jobseeker_row">
                        <Col>
                                <Form.Group>
                                    <Form.Label><strong>Name</strong></Form.Label>
                                    <Form.Control type="text" id="enterName" placeholder="Enter Name" size="lg" value={personName} onChange={(e) => setpersonName(e.target.value)} />
                                    {errors.personName && <p style={{ color: "red" }}>{errors.personName}</p>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label><strong>Address</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your address" id="enterAddress" size="lg" value={personAddress} onChange={(e) => setpersonAddress(e.target.value)} />
                                    {errors.personAddress && <p style={{ color: "red" }}>{errors.personAddress}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row className="jobseeker_row">
                            <Col>
                                <Form.Group>
                                    <Form.Label><strong>Phone Number</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your phone number" id="enterPhoneNumber" size="lg" value={personPhone} onChange={(e) => setpersonPhone(e.target.value)} />
                                    {errors.personPhone && <p style={{ color: "red" }}>{errors.personPhone}</p>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label><strong>Email</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your email" id="enterEmail" size="lg" value={personEmail} onChange={(e) => setpersonEmail(e.target.value)} />
                                    {errors.personEmail && <p style={{ color: "red" }}>{errors.personEmail}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row className="jobseeker_row">
                            <Col >
                                <Form.Group>
                                    <Form.Label><strong>Experience</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your year of experience" id="enterYearOfExperience" size="lg" value={personExp} onChange={(e) => setpersonExp(e.target.value)} />
                                    {errors.personExp && <p style={{ color: "red" }}>{errors.personExp}</p>}
                                </Form.Group>
                            </Col>
                            <Col></Col>
                        </Row>
                        <br/>
                        
                        <Row className="jobseeker_row">
                            <div className="d-flex justify-content-end">
                                <Button variant="dark" id="applyButton"  style={{ width:"130px" }} onClick={handleSubmit}> Apply job</Button>
                            </div>
                        </Row>
                    </Form>
                    
                </div>
            </div>
        
    )
}

export default Jobseekerapplyjob;