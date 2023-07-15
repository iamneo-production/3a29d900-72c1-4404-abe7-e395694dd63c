import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Form, Button } from 'react-bootstrap';
import axios from '../../axios';
import { ToastContainer, toast } from 'react-toastify';

function Customerprofile() {
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isValid, setisValid] = useState(true);
    const complaintbox = useRef();

    useEffect(() => {
        getjobseekerdata();
    }, []);

    const getjobseekerdata = () => {
        const email = localStorage.getItem("email");
        axios.get(`user/getUser/${email}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            const api_data = result.data;
            if (api_data.length > 0) {
                const result_data = api_data[0];
                setEmail(result_data.email);
                setUserRole(result_data.userRole);
                setUsername(result_data.username);
                setMobileNumber(result_data.mobileNumber);
            }
        }).catch((error) => {
            alert(error);
        });
    };


    const handleComplaintBox = (e) => {
        e.preventDefault();
        setisValid(true);
        let submitData = {
            userid: email,
            complaint: complaintbox.current.value,
            userRole: userRole,
            status: 'pending'
        }
        if (submitData.userid !== '' && submitData.complaint !== '') {
            axios.post("complaintBox/addComplaint", submitData)
                .then((response) => {
                    if (response.data === "Complaint added") {
                        toast.success("Sent", {
                            className: 'custom-toast-success'
                        });
                        complaintbox.current.value = '';
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            setisValid(false);
        }
    }
    return (
        <div className="customerprofile">
           
            <Container className="Customer_details">
                <ToastContainer />
                <Form>
                    <Row>
                        <h1>Person Details</h1>
                        <Form.Group className="customer_group">
                            <Form.Label>Username :</Form.Label>
                            <Form.Control type="label" value={username} readOnly></Form.Control>
                        </Form.Group>

                        <Form.Group className="customer_group">
                            <Form.Label>E-mail :</Form.Label>
                            <Form.Control type="label" value={email} readOnly></Form.Control>
                        </Form.Group>

                        <Form.Group className="customer_group">
                            <Form.Label>Mobile-Number :</Form.Label>
                            <Form.Control type="label" value={mobileNumber} readOnly></Form.Control>
                        </Form.Group>

                        <Form.Group className="customer_group">
                            <Form.Label>UserRole :</Form.Label>
                            <Form.Control type="label" value={userRole} readOnly></Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
            <br />
            <Container className="Customer_ComBox">
                <h3>Complaint Box</h3>
                <textarea
                    placeholder="We are here to help you sir"
                    ref={complaintbox}
                    className="Customer_textarea"
                />
                {isValid === false && <p className="Cus_blank">complaintBox can not be empty</p>}
                <div className="d-flex justify-content-end ">
                    <Button variant="light" onClick={handleComplaintBox}>submit</Button>
                </div>
            </Container>
        </div>
    );
}

export default Customerprofile; 