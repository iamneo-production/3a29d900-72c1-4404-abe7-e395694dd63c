import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container, Form } from 'react-bootstrap';
import axios from '../../axios.jsx';
import './jobseeker.css';
import { useNavigate} from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';


function Jobseekerdashboard() {
    const [data, setdata] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [selectedCard,setSelectedCard] = useState(null);
    const [searchLocation,setsearchLocation] = useState('');
    
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
                'Content-Type': 'application/json'
            }
        })
            .then((result) => {
                setdata(result.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const cardStyle = {
        alignItems: 'center'
    }
    
    const filterData = () => {
        if (searchLocation.trim() === "") {
            setfilteredData(data);
        } else { 
            const filtered = data.filter(item => item.jobLocation.toLowerCase().includes(searchLocation.toLowerCase()));
            setfilteredData(filtered);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        filterData();
    };


    const handleCardClick = (item) => {
        if(isAvailable(item.toDate)){
            navigate( '/jobseeker/applyJob',{
            state : {itemData : item}
            });
        }
        else{
            toast.error('Job is Expired')
        }
    }

    const isAvailable = (toDate) =>{
        const currentDate = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
        const expiryDate = new Date(toDate).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/');
        return currentDate <= expiryDate;
    }

    const getdate = (fromDate) =>{
        const from_date = new Date(fromDate).toLocaleDateString('en-GB',{day : '2-digit', month : '2-digit' , year:'numeric'}).replace(/-/g,'/');
        return from_date;
    }  

    return (
        <div className='job_bgimg'>
            <div className='scroll-container'>
            <ToastContainer/>
                <div>
                <Form onSubmit={handleSearch}>
                    <Row className="cus_searchbox">
                        <Col xs={8} sm={8} md={5} lg={5}>
                            <Form.Control type='text' name='textbox' placeholder='Type here to search jobs' value={searchLocation} onChange={(e) => setsearchLocation(e.target.value)} />
                        </Col>
                        <Col>
                            <div>
                                <Button variant="dark" type="submit" id='searchButton'>Search</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                    <Container className='mt-3' >
                        <Row xs={1} sm={1} md={1} lg={1}>
                            {filteredData.length > 0 ? (
                                filteredData.map((item,index) => (
                                <Col xs={11} sm={10} md={10} lg={8} key={item.jobId}>
                                    <Card  id={`userGrid${index + 1}`} className='mb-4' style={{ cardStyle }} onClick={() => handleCardClick(item)}>
                                        <Card.Body  className={`jobseeker_card  ${selectedCard === item ? 'selected-card' : ''}`}>
                                            <Row >
                                                <Col className="jobcard_col">
                                                    <Card.Text><strong>Job Description : </strong>{item.jobDescription}</Card.Text>
                                                    <Card.Text><strong>From Date       :</strong>{getdate(item.fromDate)}</Card.Text>
                                                    <Card.Text><strong>Job Location    :</strong>{item.jobLocation}</Card.Text>
                                                </Col>
                                                <Col className="jobcard_col">
                                                    <Card.Text><strong>Wage Per Day :</strong>{item.wagePerDay}</Card.Text>
                                                    <Card.Text><strong>To Date   :</strong>{getdate(item.toDate)}</Card.Text>
                                                    <Card.Text><strong>Phone Number :</strong>{item.phoneNumber}</Card.Text>
                                                    <br />
                                                    <div className="d-flex justify-content-end ">
                                                        {isAvailable(item.toDate) ? (
                                                        <Button  variant="success" > Available</Button>
                                                        ) :(
                                                            <Button variant='danger'  >Not Available</Button>
                                                        )
                                                        }
                                                    </div>

                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                            ):(
                                <h2 style={{color:'white',textAlign:'center',fontSize:'80px',paddingTop:'40px'}}>Loading</h2>
                            )
                            }
                        </Row>
                    </Container >

                </div >
            </div>
        </div>
    );
}

export default Jobseekerdashboard;
