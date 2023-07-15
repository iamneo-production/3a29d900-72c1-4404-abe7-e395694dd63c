import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Container, Button } from "react-bootstrap";
import axios from '../../axios';
import './Customer.css';
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";

function Customerdashboard() {
    const [data, setdata] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [editjobLocation, seteditjobLocation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getApiData();
    }, []);

    useEffect(() => {
        filterData();
    }, [data]);

    const getApiData = () => {
        axios.get('admin/getalljobs', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            setdata(result.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const filterData = () => {
        if (editjobLocation.trim() === "") {
            setfilteredData(data);
        } else { //item => item.jobLocation.toLowerCase().includes(textbox.toLowerCase())
            const filtered = data.filter(item => item.jobLocation.toLowerCase().includes(editjobLocation.toLowerCase()));
            setfilteredData(filtered);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        filterData();
    };

    const handleCardClick = (item) => {
        if(isAvailable(item.toDate)){
            navigate( '/customer/applyJob',{
            state : {itemData : item}
            });
        }
        else{
            toast.warning('card is expired');
        }
    }


    const cardStyle = {
        alignItems: 'center'
    }
    const isAvailable = (date) => {
        const currentDate = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
        const expiryDate = new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
        return currentDate <= expiryDate;
    }

    const getdate = (date) => {
        const get_date = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/-/g, '/');
        return get_date;
    }


    return (
        <div className="customer_dashboard">
            <div className="customer_scrollbar"> 
                <ToastContainer/>
                <Form onSubmit={handleSearch}>
                    <Row className="cus_searchbox">
                        <Col xs={8} sm={8} md={5} lg={5}>
                            <Form.Control type='text' name='textbox' placeholder='Type here to search jobs' value={editjobLocation} onChange={(e) => seteditjobLocation(e.target.value)} />
                        </Col>
                        <Col>
                            <div>
                                <Button variant="dark" type="submit" id="searchButton">Search</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                <Container className="mc-3" >
                    <Row xs={1} sm={1} md={1} lg={1}>
                        {filteredData.map((item, index) => (
                            <Col xs={14} sm={10} md={11} lg={8} key={item.jobId}>
                                <Card id={`cusGrid${index + 1}`} className="mt-4" style={{ cardStyle }} onClick={() => handleCardClick(item)}>
                                    <Card.Body className="cus_card">
                                        <Row>
                                            <Col className="cus_col">
                                                <Card.Text ><b >Job Description: {item.jobDescription}</b> </Card.Text>
                                                <Card.Text><b>From Date : {getdate(item.fromDate)}</b></Card.Text>
                                                <Card.Text><b>Job Location : {item.jobLocation}</b></Card.Text>
                                            </Col>
                                            <Col className="cus_col">
                                                <Card.Text><b>Wage Per Day : {item.wagePerDay}</b></Card.Text>
                                                <Card.Text><b>To Date : {getdate(item.toDate)}</b></Card.Text>
                                                <Card.Text><b>Phone Number : {item.phoneNumber}</b></Card.Text>
                                                <br />
                                                <div className="d-flex justify-content-end ">
                                                    {isAvailable(item.toDate) ? (
                                                        <Button  variant="success" >Available</Button>
                                                    ) : (
                                                        <Button variant='danger'>Not Available</Button>
                                                    )}

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
        
    );
}

export default Customerdashboard;