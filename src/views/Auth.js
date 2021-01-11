import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

// Import Components
import NotFound from '../views/error/NotFound';
import Register from '../components/Register';
import Login from '../components/Login';
import Forgot from '../components/Forgot';

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
    const { method } = useParams();

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
    } else {
        return <NotFound/>
    }
}

export default Auth;