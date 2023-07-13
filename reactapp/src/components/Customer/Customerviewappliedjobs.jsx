import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import axios from '../../axios.jsx';
import './Customer.css';
import './chatbox.css';
import Review from "./Reviews";
import {toast,ToastContainer} from "react-toastify";

function Customerviewappliedjobs() {

  const [data, setdata] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [showmodal,setShowmodal] = useState(false);



  useEffect(() => {

    getApiData();
  }, []);

  const getApiData = () => {
    const email = localStorage.getItem("email");
    axios.get(`user/dashboard/${email}`, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((result) => {
      setdata(result.data);
    }).catch((error) => {
      console.log(error);
    });
  };


  const handleDecision = (card, status) => {
    const profileData = {
      personId: card.id,
      personName: card.personName,
      personAddress: card.personAddress,
      personExp: card.personExp,
      personPhone: card.personPhone,
      personEmail: card.personEmail,
      jobModel: card.jobModel,
      personStatus: status
    }
    axios.put(`jobseeker/editProfile/${card.id}`, profileData)
      .then((response) => {
        if (response.data === 'Profile updated') {
          toast.success('accepted');
          window.location.reload();
        }
      }).catch((error) => {
        console.log(error)
      })
  };
  

  const toggleChat = (card) => {
    setIsChatOpen(!isChatOpen);
    const email = card.personId;
    axios.get(`chatBox/getCustomerchat/${email}`, {
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
      const customer_email = localStorage.getItem("email");
      const newMessage = {
        customerid: customer_email,
        sender: "Customer",
        jobseekerid: selectedCard.personId,
        content: message
      };
      setChatMessages([...chatMessages, newMessage]);
      axios.post(`chatBox/setCustomerChat`, newMessage)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
      setMessage("");
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const cardStyle = {
    alignItems: 'center'
  }


  return (
    <div className="cus_viewapplied">
      <div className="customer_scrollbar">
        <ToastContainer/>
        <Container className='m-3' >
          <Row xs={1} sm={1} md={1} lg={1}>
            {data.map((item, index) => (
              <Col xs={14} sm={12} md={9} lg={8} key={item.id}>
                <Card id={`candidatesGrid${index + 1}`} className="mt-4" style={{ cardStyle }}>
                  <Card.Body className="cus_card">
                    <Row className="cus_row">
                      <Col >
                        <Card.Text ><strong>Name of Candidate : </strong> {item.personName}</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text><strong>Address :</strong>{item.personAddress}</Card.Text>
                      </Col>
                    </Row>
                    <Row className="cus_row">
                      <Col>
                        <Card.Text><strong>Phone Number    :</strong>{item.personPhone}</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text><strong>Email id   :</strong>{item.personEmail}</Card.Text>
                      </Col>
                    </Row>
                    <Row className="cus_row">
                      <Col>
                        <Card.Text><strong>Year of Experience    :</strong>{item.personExp}</Card.Text>
                      </Col>
                      <Col>
                          <div className="d-flex justify-content-spacebetween">
                            <div>
                              <Button variant="dark" onClick={() => setShowmodal(true)}>
                                Review
                              </Button>
                                
                            </div>
                            <Review
                                show={showmodal}
                                onHide={() => setShowmodal(false)}
                                jobseekerid = {item.personId}
                              />
                            {item.personStatus === "" && (
                              <div>
                                <Button variant="success" onClick={() => handleDecision(item, 'Applied')}>Applied</Button>
                                <Button variant="danger" onClick={() => handleDecision(item, 'Rejected')}>Rejected</Button>
                              </div>
                            )}
                            {item.personStatus === "Applied" && (
                              <div>
                                <label style={{ color: "black", backgroundColor: "green" }}>Applied </label>
                                <Button variant="light" id="chatButton" onClick={() => toggleChat(item)}>Chat</Button>
                              </div>
                            )}
                            {item.personStatus === "Rejected" && (                 
                                <label style={{ color: "black", backgroundColor: "red", alignItems: 'center' }}> Rejected</label>
                            )}
                          </div>
                            
                            {isChatOpen && (
                              <div className="chatbox">
                                <div className="chatbox-header">
                                  <div className="chatbox-header-content">
                                    <h3>Customer</h3>
                                  </div>
                                  <div className="chatbox-header-actions">
                                    <Button style={{backgroundColor:'transparent'}} onClick={() => setIsChatOpen(false)}> <i className="bi bi-x-square-fill"></i></Button></div>
                                </div>
                                {/* Chatbox messages */}
                                <div className="chatbox-messages">
                                  {chatMessages.map((msg, index) => (
                                    <div className={`chatbox-message ${msg.sender === "Customer" ? "chatbox-message-customer" : "chatbox-message-candidate"}`}>
                                      <div className="message-content">
                                        {msg.content}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {/* User input textbox */}
                                <div className="chatbox-footer">
                                  <input type="text" className="chatbox-input" placeholder="Type your message..." value={message} onChange={handleInputChange} />
                                  <button className="chatbox-button" onClick={() => sendMessage()}><i className="bi bi-send-fill" /></button>
                                </div>
                              </div>
                            )} 
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

export default Customerviewappliedjobs;