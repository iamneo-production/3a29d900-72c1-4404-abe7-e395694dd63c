
import React, { useState } from 'react';
import axios from '../../axios.jsx';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import './admin.css';

function Addadmin(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [userRole, setUserRole] = useState('admin');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    setUserRole('admin');
    
    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Mobile number validation
    if (!mobileNumber) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      errors.mobileNumber = 'Invalid mobile number';
    }
    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const admin = {
        email,
        password,
        mobileNumber,
        userRole
      };
      

      try {
        const res = await axios.post('admin/signup', admin);
        console.log(res.data);
        if (res.data === "Email already exists") {
          toast.error(res.data);
        } else {
          toast.success(res.data)
          // Simulate a delay of 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate('/Admin/dashboard');
        }
      } catch (error) {
        console.log(error);
        // setIsLoading(false);
      }
    } else {
      setErrors(validateForm);
    }

  };


  return (
    <div className='admin_signup'>
      <div className="adm_signupform">
        <Form >
          <ToastContainer />
          <Form.Label   >
            Add New Admin
          </Form.Label>
          <Form.Group className="mb-3" >
            <Form.Control type="label" id="userRole" value={userRole}  readOnly/>
          </Form.Group>
          
          <Form.Group className="mb-3" >
            <Form.Control type="text" id="email" placeholder=" Enter email" onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span>{errors.email}</span>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control type="text" id="mobileNumber" placeholder=" Enter Mobilenumber" onChange={(e) => setMobileNumber(e.target.value)} required />
            {errors.mobileNumber && <span>{errors.mobileNumber}</span>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control type="password" id="password" placeholder=" Password" onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <span>{errors.password}</span>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control type="password" id="confirmPassword" placeholder=" Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </Form.Group>
          <div className="button">
            <Form.Group>
              <Button variant="dark"  id="submitButton" onClick={handleSubmit} >Submit</Button>
            </Form.Group>
            <br />
          </div>
        </Form>
      </div>
      </div>
  );
}

export default Addadmin;
