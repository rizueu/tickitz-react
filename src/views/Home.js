import { Fragment } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom";

// Import Images
import HeroImage from '../images/hero.png';
import spiderMan from '../images/cover/now-showing/spiderman.jpg';
import lionKing from '../images/cover/now-showing/lionking.jpg';
import jhonWick from '../images/cover/now-showing/jhonwick3.jpg';
import blackWidow from '../images/cover/upcoming/blackwidow.jpg';
import tenet from '../images/cover/upcoming/tenet.jpg';
import theWitches from '../images/cover/upcoming/witches.jpg';

const Home = () => {
   return (
        <Fragment>
            <Container>
                <Row className="py-4">
                    <Col lg={6} className="d-flex align-items-center justify-content-center justify-content-lg-start">
                        <div className="text-center hero-text__home">
                            <p className="text-muted">Nearest Cinema, Newest Movie,</p>
                            <h1 className="display-4 text-primary font-weight-bold">Find out now!</h1>
                        </div>
                    </Col>
                    <Col lg={6} className="d-flex justify-content-center">
                        <img src={HeroImage} alt="hero" />
                    </Col>
                </Row>
            </Container>

            
            <div style={{ backgroundColor: "#F5F6F8" }} className="py-5">
                <Container>
                    <Row className="mb-4">
                        <Col>
                            <h5 className="font-weight-bold text-primary header-now-showing__home">Now Showing</h5>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Link className="text-primary text-decoration-none" to="#">view all</Link>
                        </Col>
                    </Row>
                    <div className="now-showing__home landscape-list__home">
                        <Card 
                            className="mr-3">
                            <Card.Body>
                                <img src={spiderMan} alt="spider-man"/>
                            </Card.Body>
                            {/* <div className={`text-center position-relative p-3 d-none`}>
                                <h6>Spider-Man:<br/>Homecoming</h6>
                                <small className="text-muted">Action, Adventure, Sci-Fi</small>
                                <Link className="btn btn-primary btn-block mt-3" to="">Detail</Link>
                                <Link className="btn btn-outline-primary btn-block" to="">Book Now</Link>
                            </div> */}
                        </Card>
                        <Card 
                            className="mr-3">
                            <Card.Body>
                                <img src={lionKing} alt="lion-king"/>
                            </Card.Body>
                            {/* <div className={`text-center position-relative p-3 d-none`}>
                                <h6>Spider-Man:<br/>Homecoming</h6>
                                <small className="text-muted">Action, Adventure, Sci-Fi</small>
                                <Link className="btn btn-primary btn-block mt-3" to="">Detail</Link>
                                <Link className="btn btn-outline-primary btn-block" to="">Book Now</Link>
                            </div> */}
                        </Card>
                        <Card 
                            className="mr-3">
                            <Card.Body>
                                <img src={jhonWick} alt="jhon-wick-3"/>
                            </Card.Body>
                            {/* <div className={`text-center position-relative p-3 d-none`}>
                                <h6>Spider-Man:<br/>Homecoming</h6>
                                <small className="text-muted">Action, Adventure, Sci-Fi</small>
                                <Link className="btn btn-primary btn-block mt-3" to="">Detail</Link>
                                <Link className="btn btn-outline-primary btn-block" to="">Book Now</Link>
                            </div> */}
                        </Card>
                        <Card 
                            className="mr-3">
                            <Card.Body>
                                <img src={spiderMan} alt="spider-man"/>
                            </Card.Body>
                            {/* <div className={`text-center position-relative p-3 d-none`}>
                                <h6>Spider-Man:<br/>Homecoming</h6>
                                <small className="text-muted">Action, Adventure, Sci-Fi</small>
                                <Link className="btn btn-primary btn-block mt-3" to="">Detail</Link>
                                <Link className="btn btn-outline-primary btn-block" to="">Book Now</Link>
                            </div> */}
                        </Card>
                        <Card 
                            className="mr-3">
                            <Card.Body>
                                <img src={lionKing} alt="lion-king"/>
                            </Card.Body>
                            {/* <div className={`text-center position-relative p-3 d-none`}>
                                <h6>Spider-Man:<br/>Homecoming</h6>
                                <small className="text-muted">Action, Adventure, Sci-Fi</small>
                                <Link className="btn btn-primary btn-block mt-3" to="">Detail</Link>
                                <Link className="btn btn-outline-primary btn-block" to="">Book Now</Link>
                            </div> */}
                        </Card>
                        <Card 
                            className="mr-3">
                            <Card.Body>
                                <img src={jhonWick} alt="jhon-wick-3"/>
                            </Card.Body>
                            {/* <div className={`text-center position-relative p-3 d-none`}>
                                <h6>Spider-Man:<br/>Homecoming</h6>
                                <small className="text-muted">Action, Adventure, Sci-Fi</small>
                                <Link className="btn btn-primary btn-block mt-3" to="">Detail</Link>
                                <Link className="btn btn-outline-primary btn-block" to="">Book Now</Link>
                            </div> */}
                        </Card>
                    </div>
                </Container>
            </div>


            <div className="py-5">
                <Container>
                    <Row className="mb-3">
                        <Col>
                            <h5 className="font-weight-bold">Upcoming Movies</h5>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Link className="text-primary text-decoration-none" to="#">view all</Link>
                        </Col>
                    </Row>
                    <div className="landscape-list__home mb-4">
                        <Button variant="primary" className="mr-2 py-2">September</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">October</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">November</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">Desember</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">January</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">February</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">March</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">April</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">May</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">June</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">July</Button>
                        <Button variant="outline-primary" className="mr-2 py-2">August</Button>
                    </div>
                    <div className="upcoming-movies__home landscape-list__home">
                        <Card className="border p-2 text-center mr-3">
                            <Card.Body>
                                <img src={blackWidow} alt="black-widow"/>
                                <h5 className="font-weight-bold mt-3">Black Widow</h5>
                                <small className="text-muted">Action, Adventure, Sci-Fi</small>
                                <br/>
                                <Link to="/movies/2021/black-widow" className="btn btn-outline-primary w-100 mt-5">Details</Link>
                            </Card.Body>
                        </Card>
                        <Card className="border p-2 text-center mr-3">
                            <Card.Body>
                                <img src={tenet} alt="tenet"/>
                                <h5 className="font-weight-bold mt-3">Tenet</h5>
                                <small className="text-muted">Action, Sci-Fi</small>
                                <br/>
                                <Link to="/movies/2020/tenet" className="btn btn-outline-primary w-100 mt-5">Details</Link>
                            </Card.Body>
                        </Card>
                        <Card className="border p-2 text-center mr-3">
                            <Card.Body>
                                <img src={theWitches} alt="the-witches"/>
                                <h5 className="font-weight-bold mt-3">The Witches</h5>
                                <small className="text-muted">Adventure, Comedy, Family</small>
                                <br/>
                                <Link to="/movies/2020/the-witches" className="btn btn-outline-primary w-100 mt-5">Details</Link>
                            </Card.Body>
                        </Card>
                        <Card className="border p-2 text-center mr-3">
                            <Card.Body>
                                <img src={blackWidow} alt="black-widow"/>
                                <h5 className="font-weight-bold mt-3">Black Widow</h5>
                                <small className="text-muted">Action, Adventure, Sci-Fi</small>
                                <br/>
                                <Link to="/movies/2021/black-widow" className="btn btn-outline-primary w-100 mt-5">Details</Link>
                            </Card.Body>
                        </Card>
                        <Card className="border p-2 text-center mr-3">
                            <Card.Body>
                                <img src={tenet} alt="tenet"/>
                                <h5 className="font-weight-bold mt-3">Tenet</h5>
                                <small className="text-muted">Action, Sci-Fi</small>
                                <br/>
                                <Link to="/movies/2020/tenet" className="btn btn-outline-primary w-100 mt-5">Details</Link>
                            </Card.Body>
                        </Card>
                        <Card className="border p-2 text-center mr-3">
                            <Card.Body>
                                <img src={theWitches} alt="the-witches"/>
                                <h5 className="font-weight-bold mt-3">The Witches</h5>
                                <small className="text-muted">Adventure, Comedy, Family</small>
                                <br/>
                                <Link to="/movies/2020/the-witches" className="btn btn-outline-primary w-100 mt-5">Details</Link>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>


            <div className="pt-4 pb-5">
                <Container>
                    <Card className="py-5 rounded shadow-lg border-0">
                        <Card.Body>
                            <div className="d-flex justify-content-center align-items-center flex-column text-center">
                                <p className="text-muted">Be the vanguard of the</p>
                                <h1 style={{ marginTop: "-15px" }} className="display-6 text-primary font-weight-bold">Moviegoers</h1>
                                <Form className="row mt-3 mb-4 d-flex justify-content-center">
                                    <div className="col-auto p-0 mr-0 mr-md-2">
                                        <Form.Control
                                            type="email"
                                            placeholder="Type your email"
                                            className="rounded py-3 px-4 h-100"
                                        />
                                    </div>
                                    <div className="col-auto mt-3 mt-md-0 p-0">
                                        <Button variant="primary" className="rounded py-3 px-4">Join Now</Button>
                                    </div>
                                </Form>
                                <small className="text-muted">By joining you as a Tickitz member,<br/>we will always send you the latest updates via email .</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default Home