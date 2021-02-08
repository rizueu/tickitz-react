import { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getNowShowing, getUpComing } from '../redux/actions/movies'
import moment from 'moment'
import axios from 'axios'

// Import Images
import HeroImage from '../images/hero.png';

const Home = () => {
    let seasons = [
        'September',
        'October',
        'November',
        'Desember',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August'
    ]

    const movies = useSelector(state => state.movies)
    const dispatch = useDispatch()

    const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    async function submitHandler(e) {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}api/v1/moviegoers`, {email})
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }

    const {nowShowingMovies, upComingMovies} = movies

    useEffect(() => {
        getNowShowing(moment().format('MMMM'), dispatch)
        getUpComing(selectedSeason, dispatch)
    }, [selectedSeason, dispatch])

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
                        <img src={HeroImage} alt="hero" className="img-fluid" />
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
                        {
                            nowShowingMovies.map((element, index) => {
                                return (
                                    <Card 
                                        key={index.toString()}
                                        className="mr-3">
                                        <Card.Body>
                                            <img width="180" src={element.picture} alt={element.title} className="img-fluid" />
                                        </Card.Body>
                                        <div className="movies-dropdown d-none">
                                            <div className="position-absolute p-3">
                                                <h6 className="font-weight-bold">{element.title}</h6>
                                                <small className="text-muted">{element.genres}</small>
                                                <Link to={`/movies/${element.id}`} className="btn btn-outline-primary btn-block" >Detail</Link>
                                                <Button className="btn-block">Book Now</Button>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })
                        }
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
                        {
                            seasons.map((element, index) => {
                                return (
                                    <Button
                                        key={index.toString()}
                                        onClick={e => {
                                            e.preventDefault();
                                            setLoading(true);
                                            setSelectedSeason(element);
                                            setTimeout(() => setLoading(false), 1000);
                                        }}
                                        variant={ selectedSeason === element ? 'primary' : 'outline-primary' }
                                        className="mr-2 py-2">
                                            {element}
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <div className="upcoming-movies__home landscape-list__home">
                        {
                            loading ? <div>Loading...</div> : (
                                upComingMovies.map((element, index) => {
                                    return (
                                        <Card key={index.toString()} className="border p-2 text-center mr-3">
                                            <Card.Body>
                                                <img width="180" src={element.picture} alt={element.title} className="img-fluid" />
                                                <h5 className="font-weight-bold mt-3">{element.title}</h5>
                                                <small className="text-muted">{element.genres}</small>
                                                <br/>
                                                <Link to={`/movies/${element.id}`} className="btn btn-outline-primary w-100 mt-5">Details</Link>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            )
                        }
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
                                <Form onSubmit={submitHandler} className="row mt-3 mb-4 d-flex justify-content-center">
                                    <div className="col-auto p-0 mr-0 mr-md-2">
                                        <Form.Control
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            type="email"
                                            placeholder="Type your email"
                                            className="rounded py-3 px-4 h-100"
                                        />
                                    </div>
                                    <div className="col-auto mt-3 mt-md-0 p-0">
                                        <Button variant="primary" type="submit" className="rounded py-3 px-4">Join Now</Button>
                                    </div>
                                </Form>
                                {
                                    message ? <small className="text-center text-muted mb-3">{message}</small> : ''
                                }
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