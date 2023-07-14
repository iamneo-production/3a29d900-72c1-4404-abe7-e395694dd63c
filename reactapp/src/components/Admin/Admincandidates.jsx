import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import axios from '../../axios.jsx';
import './admin.css';
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";


function AdminCandidates() {
    const [data, setdata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getApiData();
    }, []);


    const getApiData = () => {
        axios.get('admin/Profile', {
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


    const handleDelete = (item) => {
        //Delete Theme Api
       var delete_result = window.confirm(`confirm to delete : ${item.personEmail}`);
       if(delete_result){
        axios.delete(`jobseeker/deleteProfile/${item.id}`)
            .then(response => {
                if (response.data === "Profile deleted"){
                    setTimeout(() => {
                        toast.success("Sucessfully deleted");
                        window.location.reload();
                    }, 1000);
                }
            })
            .catch(error => console.log(error));
        }
    }
    
    const handleEdit = (item) =>{
        var edit_result = window.confirm(` Edit : ${item.personEmail} details`);
        if(edit_result){
            navigate ('/Admin/Editcandidates',{
                state : {item}
            });
        }
    }
        

    return (
        <div>
            <div className="admin_scrollbar">
            <div className="admin_candidate">
                <ToastContainer/>
                <Container className='md-3' >
                    <Row xs={1} sm={1} md={1} lg={1}>
                        {data.map((item, index) => (
                            <Col xs={14} sm={12} md={9} lg={9} key={item.id}>
                                <Card  id={`adminCandidatesGrid${index + 1}`} className="mb-4" style={{ cardStyle }}>
                                    <Card.Body className= "candidate_card">
                                        <Row className="adm_col">
                                            <Col >
                                                <Card.Text ><b>Name of Candidate : </b> {item.personName}</Card.Text></Col>
                                            <Col><Card.Text><b>Address :</b>{item.personAddress}</Card.Text></Col>
                                        </Row>
                                        <Row className="adm_col">
                                            <Col><Card.Text><b>Phone Number    :</b>{item.personPhone}</Card.Text></Col>
                                            <Col><Card.Text><b>Email id   :</b>{item.personEmail}</Card.Text></Col>
                                        </Row>
                                        <Row className="adm_col">
                                            <Col><Card.Text><b>Year of Experience    :</b>{item.personExp}</Card.Text></Col>
                                            <Col>
                                                <div >
                                                    
                                                    <Button variant="" id="editCandidate" onClick={()=> handleEdit(item)}><i className="bi bi-pencil-square" style={{ color: 'black' }} /></Button>
                                                    <Button variant="" id="deleteCandidate" onClick={() => handleDelete(item)}><i className="bi bi-trash3-fill" style={{ color: 'black' }}></i></Button>
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

export default AdminCandidates;