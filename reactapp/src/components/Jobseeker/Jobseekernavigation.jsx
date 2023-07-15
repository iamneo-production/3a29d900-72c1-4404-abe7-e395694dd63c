
import React, { useState, useEffect } from "react";
import './jobseekernavigation.css';
import { Dropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserLarge, faSignOut } from '@fortawesome/free-solid-svg-icons';
import axios from '../../axios.jsx';
import Logo from '../../Images/Logo.png';

function Jobseekernavigation() {

    const navigate = useNavigate();
    const [isdropdownOpen, setIsDropdownOpen] = useState(false);
    const [profileHovered, setProfileHovered] = useState(false);
    const [logoutHovered, setLogoutHovered] = useState(false);
    const [reviewHovered, setReviewHovered] = useState(false);
    const [username, setUsername] = useState('');
    

    useEffect(() => {
        getjobseekerdata();
    }, []);

    const getjobseekerdata = () => {
        const email = localStorage.getItem("email");
        axios.get(`user/getUser/${email}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            const api_data = result.data;
            if (api_data.length > 0) {
                const result_data = api_data[0];
                setUsername(result_data.username);
            }
        }).catch((error) => {
            alert(error);
        });
    };



    const handleLogout = () => {
        toast.success("logout",{
            className: 'custom-toast-logout'
        });
        localStorage.removeItem("email");
        sessionStorage.removeItem("isAuth");
        sessionStorage.removeItem("role");
        setTimeout(() => {
            navigate("/");
        }, 2000);

    };
    const itemStyle1 = {
    };
    const itemStyle2 = {
    };
    const itemStyle3 = {
    };


    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isdropdownOpen);
    };

    const handleMouseEnter1 = () => {
        setProfileHovered(true);
    };
    const handleMouseEnter2 = () => {
        setReviewHovered(true);
    };
    const handleMouseEnter3 = () => {
        setLogoutHovered(true);
    };
    

    const handleMouseLeave1 = () => {
        setProfileHovered(false);
    };
    const handleMouseLeave2 = () => {
        setReviewHovered(false);
    };
    const handleMouseLeave3 = () => {
        setLogoutHovered(false);
    };

    if (profileHovered) {
        itemStyle1.backgroundColor = 'grey';
    }else if(reviewHovered){
        itemStyle2.backgroundColor = 'grey';
    }else {
        itemStyle3.backgroundColor = 'grey';
    };

    const handelProfile = () => {
        navigate('/jobseeker/profile');
    }

    const handelReview = () => {
        navigate('/jobseeker/reviews');
    }

    return (
        <div>
            
            <ToastContainer />
            <div className="header" >
                <div className='logo-container'>
                    <img src={Logo} alt='Logo' className="logo-image" />
                </div>
                
                <nav>
                    <ul className="nav_links">
                        <li >
                            <NavLink to="/jobseeker/dashboard" activeclassname="active" id="userHomeButton">  Home</NavLink>
                        </li>
                        <li >
                            <NavLink to="/jobseeker/appliedJob" activeclassname="active" id="userAppiledJobs"> Applied jobs </NavLink>
                        </li>
                    </ul>
                </nav>
                <div>
                    <Dropdown show={isdropdownOpen} onToggle={handleDropdownToggle}>
                        <Dropdown.Toggle variant="transparent" id="jobseekerDropdown">
                            <FontAwesomeIcon icon={faUserLarge} style={{ color: 'white', fontSize: '1.5rem' }} />
                        </Dropdown.Toggle>
                        <b style={{ color: 'white' }}>Hello, {username}</b>
                        <Dropdown.Menu  className="dropdown-menu">
                            <Dropdown.Item onClick={handelProfile}
                                id="profilebutton"
                                onMouseEnter={handleMouseEnter1}
                                onMouseLeave={handleMouseLeave1}
                                 style={itemStyle1}>
                                <FontAwesomeIcon icon={faUserCircle} style={{ color: 'black', fontSize: '1.1rem', paddingRight: '8px' }} />
                                MyProfile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handelReview}
                                id="Reviewbutton"
                                onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2} style={itemStyle2}>
                                <i className="bi bi-list-stars" style={{ color: 'black', fontSize: '1.1rem', paddingRight: '8px' }} />
                                Reviews
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}
                                id="logout"
                                onMouseEnter={handleMouseEnter3}
                                onMouseLeave={handleMouseLeave3} 
                                style={itemStyle3}>
                                <FontAwesomeIcon icon={faSignOut} style={{ color: 'black', fontSize: '1.1rem', paddingRight: '8px' }} />
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default Jobseekernavigation;