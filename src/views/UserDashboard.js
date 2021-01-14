import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

// Import Picture
import UserPic from '../images/user.png';

const UserDashboard = () => {
    return (
        <div style={{ backgroundColor: "#F6F6F6" }} className="py-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <Card style={{ borderRadius: "1rem", color: "#14142B" }} className="border-0">
                            <Card.Header style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }} className="bg-white p-5">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span>INFO</span>
                                    <svg width="35" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.0013 16.3333C15.29 16.3333 16.3346 15.2887 16.3346 14C16.3346 12.7113 15.29 11.6667 14.0013 11.6667C12.7126 11.6667 11.668 12.7113 11.668 14C11.668 15.2887 12.7126 16.3333 14.0013 16.3333Z" fill="#5F2EEA"/>
                                        <path d="M22.1654 16.3333C23.454 16.3333 24.4987 15.2887 24.4987 14C24.4987 12.7113 23.454 11.6667 22.1654 11.6667C20.8767 11.6667 19.832 12.7113 19.832 14C19.832 15.2887 20.8767 16.3333 22.1654 16.3333Z" fill="#5F2EEA"/>
                                        <path d="M5.83333 16.3333C7.122 16.3333 8.16667 15.2887 8.16667 14C8.16667 12.7113 7.122 11.6667 5.83333 11.6667C4.54467 11.6667 3.5 12.7113 3.5 14C3.5 15.2887 4.54467 16.3333 5.83333 16.3333Z" fill="#5F2EEA"/>
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <img src={UserPic} alt="user" className="img-fluid rounded-circle"/>
                                    <h5>Jonas El Rodriguez</h5>
                                    <span className="text-muted">Moviegoers</span>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-5">
                                <p className="mb-4">Loyalty Points</p>
                                <Card className="loyalty-card bg-primary border-0 mb-5">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p style={{ fontSize: "18px" }} className="text-white font-weight-bold">Moviegoers</p>
                                            <svg width="45" viewBox="0 0 53 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M32.6929 47.7625C32.3642 47.6759 32.0612 47.5117 31.8092 47.2837L22.8094 38.9983L10.8727 41.6738C10.4849 41.7615 10.0803 41.7386 9.70482 41.6077C9.32937 41.4769 8.99816 41.2433 8.74885 40.9336C8.49954 40.6238 8.34213 40.2504 8.2945 39.8556C8.24688 39.4609 8.31096 39.0607 8.47945 38.7006L13.6285 27.6945L7.37177 17.2181C7.17847 16.8841 7.07978 16.5038 7.08627 16.118C7.09276 15.7321 7.20419 15.3553 7.40861 15.028C7.62533 14.6951 7.93102 14.4296 8.29101 14.2616C8.65099 14.0937 9.05085 14.03 9.44521 14.0778L21.6015 15.5091L29.5749 6.35975C29.836 6.05775 30.1768 5.83539 30.5584 5.71815C30.94 5.60091 31.3469 5.59353 31.7325 5.69685C32.1181 5.80017 32.4668 6.01001 32.7387 6.30234C33.0105 6.59467 33.1945 6.95766 33.2696 7.34973L35.6672 19.256L46.9105 24.0946C47.2759 24.2504 47.5904 24.5055 47.8181 24.8309C48.0459 25.1564 48.1779 25.5392 48.1991 25.9358C48.2125 26.3215 48.1206 26.7035 47.9333 27.0409C47.746 27.3783 47.4704 27.6583 47.136 27.8509L36.4793 33.7953L35.4355 45.9014C35.4057 46.3059 35.2607 46.6933 35.0178 47.0181C34.7748 47.3428 34.444 47.5912 34.0645 47.734C33.623 47.8949 33.1406 47.9049 32.6929 47.7625Z" fill="url(#paint0_linear)"/>
                                                <defs>
                                                    <linearGradient id="paint0_linear" x1="31.7633" y1="5.7051" x2="21.3085" y2="44.7229" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#FFF6DC"/>
                                                        <stop offset="1" stop-color="#FFC107"/>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                        <span className="text-white loyalty-points">
                                            320 
                                            <small>points</small>
                                        </span>
                                    </Card.Body>
                                </Card>
                                <p className="text-center">180 points become a master</p>
                                <div className="points-progress rounded-pill mb-5">
                                    <span className="rounded-pill"></span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserDashboard
