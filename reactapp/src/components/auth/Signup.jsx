import React, { useState } from 'react';
import './signup.css';
import axios from '../../axios.jsx';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Signup = (props) => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [userRole, setUserRole] = useState('user');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const MIN_PASSWORD_LENGTH = 6;
    const message = 'password is required';

    // Name validation
    if (!userName) {
      errors.userName = 'Name is required';
    }

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Invalid email address';
    }

    // Password validation
    if (!password) {
      errors.password = `${message}`;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `Password should be at least ${MIN_PASSWORD_LENGTH} characters long`;
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
      const user = {
        email,
        password,
        userName,
        mobileNumber,
        userRole
      };
      console.log(user);
      let endpoint = '';

      if (userRole === 'admin') {
        endpoint = 'admin/signup';
      } else {
        endpoint = 'user/signup'
      }

      try {
        const res = await axios.post(endpoint, user);
        if (res.data === "Email already exists") {
          toast.error(res.data);
        } else {
          toast.success(res.data)
          // Simulate a delay of 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(validateForm);
    }

  };


  return (
    <div className="signup-container">
      <div className="signup-content">
        <h2 className="loginHead">Register</h2>
      
        <Form >
          <ToastContainer />
          <Form.Select className="select" id='admin/user/jobseeker' value={userRole} onChange={(e) => setUserRole(e.target.value)}>
            <option >Enter User/job seeker</option>
            <option id='user' value="user">User</option>
            <option id='job seeker' value="job seeker">job seeker</option>
          </Form.Select>
          {errors.userRole && <span>{errors.userRole}</span>}
          <br />
          
          <Form.Group className="mb-3" >
            <Form.Control type="text" id="email" placeholder=" Enter email" onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span>{errors.email}</span>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control type="text" id="username" placeholder=" Enter Username" onChange={(e) => setuserName(e.target.value)} required />
            {errors.userName && <span>{errors.userName}</span>}
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
              <Button variant="primary" type="submit" id="submitButton" onClick={handleSubmit} >Submit</Button>
            </Form.Group>
            <br />
          </div>
          <div className='text'>
            <Form.Text className="text-muted">
              <b> Already a user? </b>
              <a href='/' id='signInLink'> Login</a>
            </Form.Text>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Signup;
