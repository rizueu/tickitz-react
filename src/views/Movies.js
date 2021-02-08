import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getMovieById } from '../redux/actions/movies'
import { getShowtimes } from '../redux/actions/showtimes'
import moment from 'moment'

// Import Components
import ShowtimesCard from '../components/ShowtimesCard';

const Movies = () => {
    const { id } = useParams()
    const movie = useSelector(state => state.movies.movie)
    const showtimes = useSelector(state => state.showtimes.results)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(moment(Date.now()).format('yyyy-MM-DD'));
    const [location, setLocation] = useState('Purwokerto');

    useEffect(() => {
        getMovieById(id, dispatch)
        dispatch(getShowtimes(id, date, location))
    }, [id, date, location, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Fragment>
            <Container>
                <Row className="py-5">
                    <Col lg={3}>
                        <Card className="border-0 rounded">
                            <Card.Body className="d-flex justify-content-center align-items-center">
                                <img src={movie.picture} alt="movie" width="240" className="img-fluid rounded"/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={8}>

                        <div className="text-center text-lg-left">
                            <h2 className="font-weight-bold">{movie.title}</h2>
                            <p className="text-muted">{movie.genres}</p>
                        </div>

                        <Row className="py-3">
                            <Col>
                                <small className="text-muted">Release date</small>
                                <br/>
                                <small>{moment(movie.releaseDate).format('D MMM YYYY')}</small>
                                <br/><br/>
                                <small className="text-muted">Duration</small>
                                <br/>
                                <small>{movie.duration}</small>
                            </Col>
                            <Col>
                                <small className="text-muted">Directed by</small>
                                <br/>
                                <small>{movie.director}</small>
                                <br/><br/>
                                <small className="text-muted">Casts</small>
                                <br/>
                                <small>{movie.casts}</small>
                            </Col>
                        </Row>

                        <hr/>

                        <Row className="py-2">
                            <Col>
                                <h5>Synopsis</h5>
                                <p className="text-muted">
                                    {movie.synopsis}
                                </p>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
            <div style={{ backgroundColor: "#F5F6F8" }} className="py-5">
                <Container>
                    <form 
                        className="row">
                        <Col xs={12} className="py-4 text-center">
                            <h3 className="font-weight-bold">Showtimes and Ticket</h3>
                        </Col>
                        <Col md={{ span: 3, offset: 3 }}>
                            <Form.Control
                                onChange={(e) => {
                                    setLoading(true);
                                    setDate(e.target.value);
                                    setTimeout(() => setLoading(false), 1000);
                                }}
                                value={date}
                                type="date" 
                                className="showtimes-form__movie" />
                        </Col>
                        <Col md={3} className="mt-3 mt-md-0">
                            <div className="w-auto">
                                <svg className="form-icons" fill="none" stroke="#4E4B66" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <Form.Control 
                                onChange={(e) => {
                                    setLoading(true);
                                    setLocation(e.target.value);
                                    setTimeout(() => setLoading(false), 1000);
                                }}
                                style={{ marginTop: "-29px" }} as="select" className="showtimes-form__movie">
                                <option value="Purwokerto" selected>Purwokerto</option>
                                <option value="Surabaya">Surabaya</option>
                                <option value="Jakarta">Jakarta</option>
                            </Form.Control>
                        </Col>
                    </form>
                    <Row className="py-4">
                        {
                            loading ? <div>Loading...</div> : showtimes.map((element, index) => {
                                return (
                                    <Fragment key={String(index)}>
                                        <ShowtimesCard picture={element.picture} cinemaName={element.cinemaName} address={element.address} price={element.pricePerSeat} showtimes={element.showTime} showTimeDate={date} cinemaId={element.id} movieId={id} indexShowTime={index} />
                                    </Fragment>
                                )
                            })
                        }
                        <Col xs={12} className="text-center mt-5">
                            <button className="btn text-primary mt-4 text-decoration-none">view more</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}

export default Movies
