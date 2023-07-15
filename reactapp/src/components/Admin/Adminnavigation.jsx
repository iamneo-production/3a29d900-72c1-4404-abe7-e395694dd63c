import React,{useState} from "react";
import { NavLink ,useNavigate} from 'react-router-dom';
import './adminnavigation.css';
import { Dropdown } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle,faListAlt, faSignOut, faFileText,faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from "../../Images/Logo.png";

function Adminnavigation() {
    const navigate = useNavigate();
    const [isdropdownOpen, setIsDropdownOpen] = useState(false);
    const [reportHovered, setReportHovered] = useState(false);
    const [logoutHovered, setLogoutHovered] = useState(false);
    const [complaintHovered, setComplaintHovered] = useState(false);
    const [addHovered, setAddHovered] = useState(false);

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
    const itemStyle4 = {
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isdropdownOpen);
    };

    const handleMouseEnter1 = () => {
        setReportHovered(true);
    };
    const handleMouseEnter2 = () => {
        setComplaintHovered(true);
    };
    const handleMouseEnter3 = () => {
        setLogoutHovered(true);
    };
    const handleMouseEnter4 = () => {
        setAddHovered(true);
    };
    

    const handleMouseLeave1 = () => {
        setReportHovered(false);
    };
    const handleMouseLeave2 = () => {
        setComplaintHovered(false);
    };
    const handleMouseLeave3 = () => {
        setLogoutHovered(false);
    };
    const handleMouseLeave4 = () => {
        setAddHovered(false);
    };
    

    if (reportHovered) {
        itemStyle1.backgroundColor = 'grey';
    }else if(complaintHovered){
        itemStyle2.backgroundColor = 'grey';
    }else if(logoutHovered){
        itemStyle3.backgroundColor = 'grey';
    }else if(addHovered){
        itemStyle4.backgroundColor = 'grey';
    };

    const handelReport = () => {
        navigate('/Admin/Report');
    }

    const handelComplaints = () => {
        navigate('/Admin/Complaints');
    }

    const handeladdadmin = () => {
        navigate('/Admin/add')
    }
   
    return (
        <div>
            <ToastContainer />
        <div className="admin_headers">
            <div >
                <img src={Logo} alt='Logo' className="admin-logo"/>
            </div>
            <nav>
                <ul className="admin_nav">
                    <li><NavLink to="/Admin/dashboard" activeclassname="active" id="AdminOpenings">Openings</NavLink></li>
                    <li><NavLink to="/Admin/candidates" activeclassname="active" id="AdminCandidates">Candidates</NavLink></li>
                </ul>
            </nav>
            <div>
                <Dropdown show={isdropdownOpen} onToggle={handleDropdownToggle}>
                    <Dropdown.Toggle variant="transparent" id="adminDropdown">
                        <FontAwesomeIcon icon={faUserCircle} style={{ color: 'white', fontSize: '1.5rem' }} />
                    </Dropdown.Toggle>
                    <b style={{color:'white'}}>Hello, Admin</b>
                    <Dropdown.Menu style={{transform: 'rotate(45deg)'}} className="dropdown-menu">
                        <Dropdown.Item onClick={handelReport} 
                            onMouseEnter={handleMouseEnter1}
                            onMouseLeave={handleMouseLeave1}
                            style={itemStyle1}
                            id="adminReport">
                                <FontAwesomeIcon icon={faFileText} style={{ color: 'black', fontSize: '1.1rem' ,paddingRight : '8px'}} />&nbsp;
                                Report
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handelComplaints} 
                            onMouseEnter={handleMouseEnter2}
                            onMouseLeave={handleMouseLeave2}
                            style={itemStyle2}
                            id="adminComplaints">
                            <FontAwesomeIcon icon={faListAlt} style={{ color: 'black', fontSize: '1.1rem' ,paddingRight : '8px'}} />
                                Complaints
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handeladdadmin} 
                            onMouseEnter={handleMouseEnter4}
                            onMouseLeave={handleMouseLeave4}
                            style={itemStyle4}
                            id="addAdmin">
                            <FontAwesomeIcon icon={faUser} style={{ color: 'black', fontSize: '1.1rem' ,paddingRight : '8px'}} />
                                Add Admin
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}
                            onMouseEnter={handleMouseEnter3}
                            onMouseLeave={handleMouseLeave3}
                            style={itemStyle3}
                            id="logout">
                            <FontAwesomeIcon icon={faSignOut} style={{ color: 'black', fontSize: '1.1rem' ,paddingRight : '8px'}} />&nbsp;
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        </div>
    );
}

export default Adminnavigation;