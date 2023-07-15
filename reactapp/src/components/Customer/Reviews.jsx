import { useState, useRef } from "react";
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FaStar } from "react-icons/fa";
import axios from '../../axios';
import './chatbox.css';
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';


function Review(props) {
  
    const [currentValue, setCurrentValue] = useState();
    const [hoverValue, setHoverValue] = useState(undefined);
    const [isValid, setisValid] = useState();
    const stars = Array(5).fill(0);
    const comment = useRef();
    const personId = props.jobseekerid;
   
   

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
      };

    const handleClick = value => {
        setCurrentValue(value)
    };
    
    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };
    
    const handleMouseLeave = () => {
        setHoverValue(undefined)
    };

    const submitReview = (e) => {
        e.preventDefault();
        setisValid(true);
        const userId = localStorage.getItem("email");
        let data = {
          userId: userId,
          rating: currentValue,
          comments: comment.current.value,
          personId : personId
        }
       console.log(data);
        if (data.rating > 0 && data.comments !== '') {
          setisValid(true);
          
          axios.post('customer/addReview', data)
            .then((res) => {
              if (res.data === "Successfully inserted") {
                toast.success("Sent");
                setCurrentValue(0);
                comment.current.value = '';
                props.onHide();
              }
              else {
                toast.warning(res.data);
              }
            }).catch((error) => {
              console.log(error);
            });
        } else {
          setisValid(false);
          return;
        }
      }

      
    return(
        <div>
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
      <Modal.Header closeButton>
        <Modal.Title >
        CookHiring Ratings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalbody">
        <h5>Click the starts to rate *</h5>
      <div className="stars">
        {stars.map((_, index) => {
           const starKey = uuid();
          return (
            <FaStar
              key={starKey}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <h5>Review *</h5>
      <textarea
        placeholder="What's your experience?"
        ref={comment}
        className="textarea"
      />
      {isValid === false && <p style={{ color: 'red' }}>Please enter a valid review</p>}
      <div className="d-flex justify-content-end ">
      <Button className="Review_button" onClick={submitReview}> Submit</Button> 
      </div>
      </Modal.Body>
     
    </Modal>
    </div>

  );
};


export default Review;
