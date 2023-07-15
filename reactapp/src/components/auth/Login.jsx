import React, { useState } from "react";
import { Form,Button  } from "react-bootstrap";
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../axios.jsx";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});



  const validateForm = () => {
    const errors = {};
    // Validate email field
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    // Validate password field
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    else if (password.length < 5) {
      errors.password = 'Password must be at least 5 characters long';
    }

    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form submission logic here
      let auth = {
        isAuth: false,
        role: null
      }
      const data = {
        email,
        password
      };
      
      axios.post("user/login", data)
        .then((result) => {
          console.log(result);
          if (result.data === true) {
            toast.success("successfully login");
            auth.isAuth = result.data;
            auth.role = "User";
            Auth(auth);
            localStorage.setItem("email", email);
            setTimeout(() => {
              navigate('/customer/dashboard');
            }, 2000);
        }
        }).catch((error) => { console.log(error); });

      axios.post("jobseeker/login", data)
        .then((result) => {
          if (result.data === true) {
            toast.success("successfully login");
            auth.isAuth = result.data;
            auth.role = "Jobseeker";
            Auth(auth);
            localStorage.setItem("email", email)
            setTimeout(() => {
              navigate('/jobseeker/dashboard');
            }, 2000);
          }
        }).catch((error) => { console.log(error); });

      axios.post("admin/login", data)
        .then((result) => {
          if (result.data === true) {
            toast.success("successfully login");
            auth.isAuth = true;
            auth.role = "Admin";
            localStorage.setItem("email", email);
            Auth(auth);
            setTimeout(() => {
              navigate('/Admin/dashboard');
            }, 2000);
          }
        }).catch((error) => { console.log(error); });
        
      // Form is valid, you can proceed with form submission or further processing
    }
    else {
      console.log('Form contains errors. Please fix them before submitting.');
    }
  };


  return (
    <div className="login-container">
      <div className="login-content">
      
      <h2 className="loginHead">Login</h2>
      <ToastContainer />
        <div>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3">
              
              <Form.Control type="email" id="email" placeholder=" Enter email" size="55" onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <span>{errors.email}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="password" id="password" placeholder=" Enter Password" size="55" onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <span>{errors.password}</span>}
            </Form.Group>
            <div>
              <br></br>
            </div>
            <Button variant="primary" type="submit" id="loginButton" >Login </Button>
            <Form.Text >
              <b style={{ color: "black" }}>New User/admin </b>
              <a href='/signup' id='signupLink'> Signup</a>
            </Form.Text>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;
