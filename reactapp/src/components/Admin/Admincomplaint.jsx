import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container} from "react-bootstrap";
import './admin.css';
import axios from '../../axios.jsx';
import complaint from "../Images/complaints.jpg";

function AdminComplaint() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getComplaintData();
    }, []);

    const getComplaintData = () => {
        axios.get(`complaintBox/getComplaint`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            setData(result.data);
            
        }).catch((error) => {
            alert(error);
        });
    };
    


    return (
        <div className="admin_scrollbar">
            
            <img src={complaint} alt="complaints" className="complaint_img" />
            
            <div className="complaint_body">
                <h1><strong>Customer Complaints</strong></h1>
                <hr className="line" />
                <Container className='m-3' >
                    <Row xs={1} sm={1} md={1} lg={1}>
                        {data.map((item, index) => (
                            item.userRole === "user" ? (
                            <Col xs={14} sm={12} md={9} lg={8} key={index}>
                                <Card  id={`ReviewGrid${index + 1}`} className="mb-4" >
                                    <Card.Body className="cmp_cardbody">
                                        <Row className="complaint_row">
                                            <Col >
                                             <Card.Text ><strong>Customer Id : </strong> {item.userid}</Card.Text>

                                                <Card.Text><strong>Complaint : </strong>{item.complaint} </Card.Text>

                                                <Card.Text>
                                                    <strong>Status : </strong>
                                                    {item.status === "Resloved" ? (
                                                        <label className="cmp_Reslove">Resloved</label>
                                                    ) : (
                                                        <label className="cmp_pending">Pending</label>
                                                    )} 
                                                    </Card.Text> 
                                            </Col>
                                        </Row>

                                    </Card.Body>
                                </Card>
                            </Col>
                            ) : null
                        ))}
                    </Row>
                </Container>
            
            <h1><strong>Jobseeker Complaints</strong></h1>
            <hr className="line" />
            <Container className='m-3' >
                <Row xs={1} sm={1} md={1} lg={1}>
                    {data.map((item, index) => (
                        item.userRole === "job seeker" ? (
                        <Col xs={14} sm={12} md={9} lg={8} key={index}>
                            <Card  id={`ReviewGrid${index + 1}`} className="mb-4" >
                                <Card.Body className="cmp_cardbody">
                                    <Row className="complaint_row">
                                        <Col >
                                            <Card.Text ><strong>JobSeeker Id : </strong> {item.userid}</Card.Text>

                                            <Card.Text><strong>Complaint : </strong>{item.complaint} </Card.Text>

                                            <Card.Text >
                                                <strong>Status : </strong> &nbsp;
                                                {item.status === "Resloved" ? (
                                                    <label className="cmp_Reslove">Resloved</label>
                                                ) : (
                                                    <label className="cmp_pending">Pending</label>
                                                )}
                                                 </Card.Text>
                                        </Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>
                        ) : null
                    ))}
                </Row>
            </Container>
            </div>
        </div>
    );
}

export default AdminComplaint;