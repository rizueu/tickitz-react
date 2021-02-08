import { Fragment, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet';
import Cryptr from 'cryptr'
import qs from 'querystring'
import axios from 'axios'

// Import Components
import NotFound from '../views/error/NotFound';
import Register from '../components/AuthComponents/Register';
import Login from '../components/AuthComponents/Login';
import Forgot from '../components/AuthComponents/Forgot';

const Layout = (props) => {
    return (
        <Container fluid>
            <Row className="vh-100">
                <Col lg={7} className="background__auth text-white d-none d-lg-block vh-100">
                    <Container>
                        {props.LeftSide}
                    </Container>
                </Col>
                <Col lg={5} className="offset-lg-7">
                    <Container>
                        <div className="p-5">
                            {props.RightSide}
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

const Auth = () => {
    const { method } = useParams()
    const location = useLocation()
    const history = useHistory()
    const token = useSelector(state => state.auth.token)
    const cryptr = new Cryptr('b4ck3nd4pp')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPasword, setRepeatPassword] = useState('')

    useEffect(() => {
        if (token !== null) {
            history.push('/')
        }
    }, [token, history])

    if( method === 'register' ) {
        return (
            <Fragment>
                <Helmet>
                    <title>Register - Tickitz</title>
                </Helmet>
                <Layout
                    LeftSide={<Register.LeftSide />} 
                    RightSide={<Register.RightSide />} 
                />
            </Fragment>
        )
    } else if( method === 'login' ) {
        return (
            <Fragment>
                <Helmet>
                    <title>Login - Tickitz</title>
                </Helmet>
                <Layout
                    LeftSide={<Login.LeftSide />} 
                    RightSide={<Login.RightSide />} 
                />
            </Fragment>
        )
    } else if( method === 'forgot' ) {
        return (
            <Fragment>
                <Helmet>
                    <title>Forgot Password - Tickitz</title>
                </Helmet>
                <Layout
                    LeftSide={<Forgot.LeftSide />} 
                    RightSide={<Forgot.RightSide />} 
                />
            </Fragment>
        )
    } else if( method === 'activate' ) {
        const params = qs.parse(location.search.slice(1))
        const { id, key } = params
        if (!id && !key) {
            return <NotFound/>
        }
        let email = cryptr.decrypt(key)
        axios.patch(`${process.env.REACT_APP_API_URL}auth/activate`, {id, email}).then(response => {
            setMessage(response.data.message)
        }).catch(error => {
            setMessage(error.response.data.message)
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col d-flex vh-100 flex-column justify-content-center align-items-center">
                        <h4>{message}</h4>
                        <a href="/auth/login">Go back to Signin Page ᐅᐅ</a>
                    </div>
                </div>
            </div>
        )
    } else if ( method === 'reset' ) {
        const params = qs.parse(location.search.slice(1))
        const { id, key } = params
        if (!id && !key) {
            return <NotFound/>
        }
        async function forgotHandler(e) {
            e.preventDefault()
            let email = cryptr.decrypt(key)
            try {
                const response = await axios.patch(`${process.env.REACT_APP_API_URL}auth/forgot_password?id=${id}&email=${email}`, {password, repeat_password: repeatPasword})
                if (response.data.success) {
                    history.push({
                        pathname: '/auth/login'
                    })
                }
            } catch (error) {
                console.error(error.response.data.message)
                throw error
            }
        }
        return (
            <Container>
                <Row>
                    <Col className="col d-flex vh-100 flex-column justify-content-center align-items-center">
                        <Form onSubmit={forgotHandler}>
                            <Form.Group>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)} value={password} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control type="password" onChange={e => setRepeatPassword(e.target.value)} value={repeatPasword} />
                            </Form.Group>
                            <Button variant="primary" className="btn-block" type="submit">Update</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return <NotFound/>
    }
}

export default Auth;