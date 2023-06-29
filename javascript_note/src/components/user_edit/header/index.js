import React, { useState } from 'react';
import { Navbar, Column, Button, Dropdown } from 'rbx';
import logoImage from '../../../assets/images/logo.png';
import "../../../styles/header.scss";
import UserService from '../../../services/users';
import { useNavigate, Link } from "react-router-dom";

function UserEditHeader(props) {
    const [redirectToHome, setRedirectToHome] = useState(false);
    const navigate = useNavigate();

    const logOut = async () => {
        UserService.logout();
        setRedirectToHome(true);
    };

    if (redirectToHome)
        navigate("/");
    
    return (
        <Navbar>
            <Navbar.Brand>
                <Column.Group>
                    <Column size="11" offset="1">
                        <Link to="/notes">
                            <img src={logoImage} alt=""/>
                        </Link>
                    </Column>
                </Column.Group>
                <Navbar.Burger
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbar-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </Navbar.Burger>
            </Navbar.Brand>

            <Navbar.Menu>
                <Navbar.Segment as="div" className="navbar-item navbar-end" align="right">
                    <Navbar.Item as="div">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Button className="button is-outlined is-custom-purple" color="white">
                                    <span>{props.headerName} ▼</span>
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Content>
                                    <Dropdown.Item as="div">
                                        <Link to="/notes">Notes</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="div">
                                        <a onClick={e => logOut()}>LogOut</a>
                                    </Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Item>
                </Navbar.Segment>
            </Navbar.Menu>
        </Navbar>
    )
}

export default UserEditHeader;
