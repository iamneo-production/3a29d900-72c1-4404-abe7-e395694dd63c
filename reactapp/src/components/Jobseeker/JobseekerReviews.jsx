import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import './jobseeker.css';
import axios from "../../axios";

function JobseekerReviews() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getreviewData();
    }, []);

    const getreviewData = () => {
        const personId = localStorage.getItem('email');
        axios.get(`customer/getReview/${personId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            setData(result.data);
            console.log(result.data);
        }).catch((error) => {
            console.log(error);
        });
    };
 


    return (
        <div className="review_img">
            <br />
            <div className="scroll-container">
                
                <div className="review_body">
                    <h1><strong>What are our customer saying?</strong></h1>
                    <hr className="review_hr"/>
                    <Container className='mt-3' >
                        <Row xs={1} sm={1} md={1} lg={1}>
                            {data.map((item, index) => (
                                <Col xs={14} sm={12} md={9} lg={6} key={index}>
                                    <Card id={`ReviewGrid${index + 1}`} className="m-4" >
                                        <Card.Body className="review_card">
                                            <Row className="review_row">
                                                <Col >
                                                    <Card.Text ><strong>Customer Id : </strong> {item.userId}</Card.Text>
                                                    <Card.Text><strong>Rating: </strong>
                                                        {[...Array(5)].map((_, starIndex) => (
                                                        <FaStar
                                                            key={starIndex}
                                                            size={24}
                                                            color={starIndex < item.rating ? "#ffc107" : "#e4e5e9"}
                                                        />
                                                    ))}
                                                    </Card.Text>
                                                    <Card.Text><strong>Comment : </strong>{item.comments} </Card.Text>
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

export default JobseekerReviews;