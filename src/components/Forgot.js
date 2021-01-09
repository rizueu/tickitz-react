import { Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/svg/logo-white.svg';
import Separator from '../components/Separator';
import { Link } from 'react-router-dom';

const LeftSide = () => {
    return (
        <div className="p-5">
            <img src={logo} className="mb-5" alt="tickitz-white-logo"/>
            <h1 className="text-white font-weight-bold">Lets reset your password</h1>
            <p style={{ fontSize: "18px" }} className="text-white-50">To be able to use your account again, please complete the following steps.</p>
            <div className="mt-5">
                <div className="d-flex align-items-center">
                    <div className="circle__auth">
                        1
                    </div>
                    <span style={{ fontSize: "20px" }} className="ml-5 text-white">Fill your complete email</span>
                </div>
                <div className="line__auth"></div>
                <div className="d-flex align-items-center">
                    <div className="circle__auth bg-transparent text-white">
                        2
                    </div>
                    <span style={{ fontSize: "20px" }} className="ml-5 text-white-50">Activate your account</span>
                </div>
                <div className="line__auth"></div>
                <div className="d-flex align-items-center">
                    <div className="circle__auth bg-transparent text-white">
                        3
                    </div>
                    <span style={{ fontSize: "20px" }} className="ml-5 text-white-50">Enter your new password</span>
                </div>
                <div className="line__auth"></div>
                <div className="d-flex align-items-center">
                    <div className="circle__auth bg-transparent text-white">
                        4
                    </div>
                    <span style={{ fontSize: "20px" }} className="ml-5 text-white-50">Done</span>
                </div>
            </div>
        </div>
    )
}

const RightSide = () => {
    return (
        <Fragment>
            <h4>Fill your complete email</h4>
            <p className="text-muted mb-4">we'll send a link to your email shortly</p>
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Write your email" className="p-4 rounded"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="btn-block py-3 rounded">
                    Join for free now
                </Button>
            </Form>
        </Fragment>
    )
}

const Register = {
    LeftSide,
    RightSide
}

export default Register;
