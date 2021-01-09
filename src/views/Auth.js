import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Import Components
import NotFound from '../views/error/NotFound';
import Register from '../components/Register';
import Login from '../components/Login';
import Forgot from '../components/Forgot';

const Layout = (props) => {
    return (
        <Container fluid>
            <Row className="vh-100">
                <Col md={7} className="background__auth text-white d-none d-md-block vh-100">
                    <Container>
                        {props.LeftSide}
                    </Container>
                </Col>
                <Col md={5} className="offset-md-7">
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
            <Layout
                LeftSide={<Register.LeftSide />} 
                RightSide={<Register.RightSide />} 
            />
        )
    } else if( method === 'login' ) {
        return (
            <Layout
                LeftSide={<Login.LeftSide />} 
                RightSide={<Login.RightSide />} 
            />
        )
    } else if( method === 'forgot' ) {
        return (
            <Layout
                LeftSide={<Forgot.LeftSide />} 
                RightSide={<Forgot.RightSide />} 
            />
        )
    } else {
        return <NotFound/>
    }
}

export default Auth;