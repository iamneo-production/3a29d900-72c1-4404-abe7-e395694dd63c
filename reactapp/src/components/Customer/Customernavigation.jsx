import React,{useState,useEffect} from "react";
import './Customernavigation.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {  Dropdown } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle,faUserLarge, faSignOut } from '@fortawesome/free-solid-svg-icons';
import axios from "../../axios";
import Logo from '../../Images/Logo.png';

function Customernavigation() {

    const [isdropdownOpen, setIsDropdownOpen] = useState(false);
    const [profileHovered, setProfileHovered] = useState(false);
    const [logoutHovered, setLogoutHovered] = useState(false);
    const [username,setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        getjobseekerdata();
    },[]);

    const getjobseekerdata = () => {
        const email = localStorage.getItem("email");
        axios.get(`user/getUser/${email}`, {
        headers: {
            "Content-Type": "application/json"
        }
        }).then((result) => {
            const api_data = result.data;
            if(api_data.length> 0) {
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

    const itemStyle = {
    };
    const itemStyle2 = {
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isdropdownOpen);
    };

    const handleMouseEnter = () => {
        setProfileHovered(true);
    };
    const handleMouseEnter2 = () => {
        setLogoutHovered(true);
    };

    const handleMouseLeave = () => {
        setProfileHovered(false);
    };

    const handleMouseLeave2 = () => {
        setLogoutHovered(false);
    };

    if (profileHovered) {
        itemStyle.backgroundColor = 'lightgrey';
    }else if(logoutHovered){
        itemStyle2.backgroundColor = 'lightgrey';
    };

    const handelProfile = () => {
        navigate('/customer/profile')
    }

    return (
        <div>
            <ToastContainer />
        <div className="Cus_headers">
            <div >
                <img src={Logo} alt='Logo' className="Cuslogo-image"/>
            </div>
            <nav>
                <ul className="customernav">
                    <li><NavLink to="/customer/dashboard" activeclassname="active" id="customerHomeButton">Home</NavLink></li>
                    <li><NavLink to="/customer/addJob" activeclassname="active" id="addOpenings">Add Openings</NavLink></li>
                    <li><NavLink to="/customer/viewAppliedCandidates" activeclassname="active" id="appliedCandidates">Applied Candidates</NavLink></li>
                </ul>
            </nav>
            <div>
                <Dropdown show={isdropdownOpen} onToggle={handleDropdownToggle}>
                    <Dropdown.Toggle variant="transparent" id="profileDropdown">
                        <FontAwesomeIcon icon={faUserLarge} style={{ color: 'white', fontSize: '1.5rem' }} />
                    </Dropdown.Toggle>
                    <b style={{color:'white'}}>Hello, {username}</b>
                    <Dropdown.Menu style={{transform: 'rotate(45deg)'}} className="dropdown-menu">
                        <Dropdown.Item onClick={handelProfile} 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={itemStyle}
                            id="customerProfile">
                                <FontAwesomeIcon icon={faUserCircle} style={{ color: 'black', fontSize: '1.1rem' ,paddingRight : '8px'}} />
                                MyProfile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}
                            onMouseEnter={handleMouseEnter2}
                            onMouseLeave={handleMouseLeave2}
                            style={itemStyle2}
                            id="logout">
                            <FontAwesomeIcon icon={faSignOut} style={{ color: 'black', fontSize: '1.1rem' ,paddingRight : '8px'}} />
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        </div>
    );

}

export default Customernavigation;