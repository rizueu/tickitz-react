import { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl } from 'react-bootstrap';
import jwt_decode from 'jwt-decode'

import { useSelector, useDispatch } from 'react-redux'
import { reset_token } from '../redux/actions/auth'

// Import Images
import NavBrand from '../images/svg/logo-primary.svg';

const NavigationBar = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    let decodedToken
    
    if (token !== null) {
        decodedToken = jwt_decode(token)
    } else {
        decodedToken = null
    }

    const logout = (e) => {
        e.preventDefault()
        dispatch(reset_token())
        if (window.confirm("Do you really want to leave?")) {
            history.push('/auth/login')
        }
    }

    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={NavBrand} alt="tickitz-primary-logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto mb-2 mb-lg-0">
                            <Form inline className="d-block d-lg-none position-relative">
                                <svg style={{ top: "15px", left: "17px" }} className="position-absolute" width="20" fill="none" stroke="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <FormControl className="w-100 py-4 pl-5" type="text" placeholder="Search.." />
                            </Form>
                            <NavDropdown className="d-block d-lg-none text-center py-2" title="Location" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Jakarta</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Surabaya</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Bandung</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item className="pl-lg-5 text-center text-lg-left py-2 py-lg-0">
                                <Nav.Link href="#">Movies</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pl-lg-5 text-center text-lg-left py-2 py-lg-0">
                                <Nav.Link href="#">Cinemas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pl-lg-5 text-center text-lg-left py-2 py-lg-0">
                                <Nav.Link href="#">Buy Ticket</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav className="ml-auto">
                            <NavDropdown className="d-none d-lg-block pr-4" title="Location" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Surabaya</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Jakarta</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item className="d-none d-lg-block pr-4">
                                <Nav.Link>
                                    <svg width="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                {
                                    (token !== null) ? (
                                        <NavDropdown className="d-none d-lg-block text-center" title={(<img width="40" src={decodedToken.picture} alt="profile" className="rounded-circle" />)} id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <Link className="btn btn-primary btn-block py-3 py-lg-2 px-4" to="/auth/register">
                                            Sign Up
                                        </Link>
                                    )
                                }
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {props.children}
        </Fragment>
    )
}

export default NavigationBar;
