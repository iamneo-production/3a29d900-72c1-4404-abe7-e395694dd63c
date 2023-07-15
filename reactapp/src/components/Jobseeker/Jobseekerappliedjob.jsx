import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "../../axios";
import "./jobseekerchatbox.css";

function Jobseekerappliedjob() {

    const [data, setdata] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        getApiData();
    }, []);


    const getApiData = () => {
        const personId = localStorage.getItem("email");
        axios.get(`jobseeker/getAppliedjobs/${personId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            setdata(result.data);
            console.log(result.data);
        }).catch((error) => {
           console.log(error);
        });
    };

    const toggleChat = (card) => {
        setIsChatOpen(!isChatOpen);
        const customerid = card.jobModel.email;
        axios.get(`chatBox/getJobseekerChat/${customerid}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            setChatMessages(result.data);
            setSelectedCard(card);
        }).catch((error) => {
            console.log(error);
        });
    };


    const sendMessage = () => {
        if (message.trim() !== "") {
            const customer_id = selectedCard.jobModel.email;
            const newMessage = {
                customerid: customer_id,
                sender: "Jobseeker",
                jobseekerid: selectedCard.personId,
                content: message
            };
            setChatMessages([...chatMessages, newMessage]);
            axios.post(`chatBox/setJobseekerChat`,newMessage)
            .catch((error) => {
              console.log(error);
            })
            setMessage("");
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    }


    const cardStyle = {
        alignItems: 'center'
    }
    const isAvailable = (toDate) => {
        const currentDate = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
        const expiryDate = new Date(toDate).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
        return currentDate <= expiryDate;
    }

    const getdate = (date) => {
        const get_date = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/-/g, '/');
        return get_date;
    }


    return (
        <div className='job_bgimg'>
            <div className="scroll-container">
                <Container className='mt-3' >
                    <Row xs={1} sm={1} md={1} lg={1}>
                        {data.map((item, index) => (
                            <Col xs={14} sm={11} md={11} lg={8} key={item.id}>
                                <Card id={`AppliedGrid${index + 1}`} className="m-4" style={{ cardStyle }}>
                                    <Card.Body className = "jobseeker_card">
                                        <Row>
                                            <Col>
                                                <Card.Text ><strong>Job Description: </strong> {item.jobModel.jobDescription}</Card.Text>
                                                <Card.Text><strong>From Date :</strong>{getdate(item.jobModel.fromDate)}</Card.Text>
                                                <Card.Text><strong>Job Location :</strong>{item.jobModel.jobLocation}</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text><strong>Wage Per Day :</strong>{item.jobModel.wagePerDay}</Card.Text>
                                                <Card.Text><strong>To Date :</strong>{getdate(item.jobModel.toDate)}</Card.Text>
                                                <Card.Text><strong>Phone Number :</strong>{item.jobModel.phoneNumber}</Card.Text>
                                                <br />
                                                <div className="js_label">
                                                <div className="d-flex justify-content-end ">
                                                    {isAvailable(item.jobModel.toDate) ? (
                                                        <Button  variant="success" > Available</Button>
                                                    ) : (
                                                        <Button variant='danger'  >Not Available</Button>
                                                    )
                                                    }

                                                    <div>
                                                        <Button variant="dark" id='chatbtn' onClick={() => toggleChat(item)}>chat</Button>
                                                    </div>
                                                </div>
                                                    {isChatOpen && (
                                                        <div className="JS_chatbox">
                                                        <div className="JS_chatbox-header">
                                                          <div className="JS_chatbox-header-content">
                                                            <h3>Customer</h3>
                                                          </div>
                                                          <div className="JS_chatbox-header-actions">
                                                            <Button style={{backgroundColor:'transparent'}} onClick={() => setIsChatOpen(false)}> <i className="bi bi-x-square-fill"></i></Button>
                                                          </div>
                                                        </div>
                                                            {/* Chatbox messages */}
                                                            <div className="JS_chatbox-messages">
                                                                {chatMessages.map((msg, index) => (
                                                                    <div key={index} className={`JS_chatbox-message ${msg.sender === "Jobseeker" ? "chatbox-message-customer" : "chatbox-message-candidate"}`}>
                                                                        <div className="JS_message-content">
                                                                           <b >{msg.content}</b>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {/* User input textbox */}
                                                            <div className="JS_chatbox-footer">
                                                                <input type="text" className="JS_chatbox-input" placeholder="Type your message..." value={message} onChange={handleInputChange} />
                                                                <button className="JS_chatbox-button" onClick={sendMessage}><i className="bi bi-send-fill"></i></button>
                                                            </div>
                                                        </div>
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

export default Jobseekerappliedjob;