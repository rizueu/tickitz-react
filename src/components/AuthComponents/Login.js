import { Fragment, useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
// State Management
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/actions/auth'
// Import Components
import Separator from '../Separator';
// Import Images
import logo from '../../images/svg/logo-white.svg';
import eye from '../../images/svg/eye.svg';
import eyeOff from '../../images/svg/eye-off.svg';

const LeftSide = () => {
    return (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center flex-column text-center vh-100">
                <img width="350" src={logo} alt="tickitz-logo-white"/>
                <p style={{ fontSize: "32px", marginTop: "-20px" }} className="text-white">wait, watch, wow!</p>
            </div>
        </Fragment>
    )
}

const RightSide = () => {
    const location = useLocation()
    const errorMsg = useSelector(state => state.auth.errorMsg)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [peekPassword, setPeekPassword] = useState(false);

    function showPassword() {
        if( peekPassword === false ){
            setPeekPassword(true);
        } else {
            setPeekPassword(false);
        }
    }

    function submitHandler(e) {
        e.preventDefault()
        setLoading(true)
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (typeof location.state !== 'undefined') {
            if (Object.keys(location.state).indexOf('response') > -1) {
                setSuccess(location.state.response)
            }
        }
    }, [location.state])

    return (
        <Fragment>
            <h1 className="font-weight-bold">Sign In</h1>
            <p className="text-muted">Sign in with your data that you entered during your registration</p>
            {(success) ? <Alert variant="success">{success}</Alert> : ''}
            {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : ''}
            <Form
                onSubmit={submitHandler}
            >
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email" placeholder="Write your email" className="p-4 rounded" required></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="position-relative">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type={peekPassword === false ? 'password' : 'text'} placeholder="Write your password" className="p-4 rounded" required />
                    <button onClick={(e) => {
                        e.preventDefault();
                        showPassword();
                    }} 
                    className="eye__auth">
                        <img width="25" src={peekPassword === false ? eye : eyeOff} alt="eye"/>
                    </button>
                </Form.Group>
                <Button variant="primary" type="submit" className={`btn-block py-3 rounded ${(loading) ? 'disabled cursor-default' : ''}`}>
                    Sign In
                </Button>
            </Form>
            <p className="text-center my-4">Forgot your password? <Link to="/auth/forgot">Reset now</Link></p>
            <Separator />
            <div className="d-flex justify-content-between mt-4">
                <button style={{ height: "55px" }} className="btn shadow rounded w-100 mr-4">
                    <svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                        <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
                        <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.0011 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
                        <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                    </svg>
                    Google
                </button>
                <button style={{ height: "55px" }} className="btn shadow rounded w-100">
                    <svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.001 2.00201C6.47901 2.00201 2.00201 6.47901 2.00201 12.001C2.00201 16.991 5.65801 21.127 10.439 21.88V14.892H7.89901V12.001H10.439V9.79801C10.439 7.29001 11.932 5.90701 14.215 5.90701C15.309 5.90701 16.455 6.10201 16.455 6.10201V8.56101H15.191C13.951 8.56101 13.563 9.33301 13.563 10.124V11.999H16.334L15.891 14.89H13.563V21.878C18.344 21.129 22 16.992 22 12.001C22 6.47901 17.523 2.00201 12.001 2.00201Z" fill="#395185"/>
                    </svg>
                    Facebook
                </button>
            </div>
        </Fragment>
    )
}

const Login = {
    LeftSide,
    RightSide
}

export default Login;
