import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from '../../axios';
import './admin.css';
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";


function Admindashboard() {
    const [data, setdata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getApiData();
    }, []);

    const getApiData = () => {
        axios.get('admin/getalljobs', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            setdata(result.data);
        }).catch((error) => {
            alert(error);
        });
    };

    const cardStyle = {
        alignItems: 'center'
    }
    const isAvailable = (date) => {
        const currentDate = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
        const expiryDate = new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
        return currentDate <= expiryDate;
    }

    const handleDelete = (item) => {
        //Delete Theme Api
        var show = window.confirm(`Confirm to delete : ${item.jobDescription}`);
        if (show) {
            axios.delete(`admin/deleteJob/${item.jobId}`)
                .then(response => {
                    if (response.data === "Job deleted")
                    {
                        setTimeout(() => {
                            toast.success("Sucessfully deleted");
                            window.location.reload();
                        }, 1000);
                    }  
                })
                .catch(error => console.log(error));
        }

    };

    const handleEdit = (id) => {
        const edit_result = window.confirm(`Confirm to edit: ${id.jobDescription}`);
        if (edit_result) {
            navigate('/Admin/Editopenings', {
                state: { id }
            });
        }
    };

    const getdate = (date) => {
        const get_date = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/-/g, '/');
        return get_date;
    }

    return (
        <div>
            <div className="admin_scrollbar">
                <ToastContainer/>
                <div className="Admin_dashboard">
                    <Container className="md-3" >
                        <Row xs={1} sm={1} md={1} lg={1}>
                            {data.map((item, index) => (
                                <Col xs={14} sm={12} md={9} lg={9} key={item.jobId}>
                                    <Card  id={`adminOpeningGrid${index + 1}`} className="mb-4" style={{ cardStyle }}>
                                        <Card.Body className="dashboard_card">
                                            <Row className="adm_col">
                                                <Col >
                                                    <Card.Text ><b >Job Description: {item.jobDescription}</b> </Card.Text></Col>
                                                <Col >
                                                    <Card.Text><b>Wage Per Day : {item.wagePerDay}</b></Card.Text></Col>
                                            </Row>
                                            <Row className="adm_col">
                                                <Col>
                                                    <Card.Text><b>From Date : {getdate(item.fromDate)}</b></Card.Text>
                                                </Col>
                                                <Col>
                                                    <Card.Text><b>To Date : {getdate(item.toDate)}</b></Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className="adm_col">
                                                <Col>
                                                    <Card.Text><b>Job Location : {item.jobLocation}</b></Card.Text>
                                                </Col>
                                                <Col>
                                                    <Card.Text><b>Phone Number : {item.phoneNumber}</b></Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className="adm_col">
                                                <Col></Col><Col>
                                                    <div className="dashboard_btn">
                                                        <ul>
                                                            <li>
                                                                {isAvailable(item.toDate) ? (
                                                                    <Button variant="success" >Available</Button>
                                                                ) : (
                                                                    <Button variant='danger'>Not Available</Button>
                                                                )}
                                                            </li>
                                                            <li><Button variant="" id="adminEditOpenings" onClick={() => handleEdit(item)}><i className="bi bi-pencil-square" /></Button></li>
                                                            <li><Button variant="" id="adminDelete" onClick={() => handleDelete(item)}><i className="bi bi-trash3-fill" /></Button></li>
                                                        </ul>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Admindashboard;