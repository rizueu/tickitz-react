import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import { default as axios } from 'axios'

// Import Components
import ShowtimesCard from '../components/ShowtimesCard';

const Movies = () => {
    const { year, slug } = useParams();
    const [movie, setMovie] = useState({});

    const getMovie = async () => {
        try {
            let {data} = await axios.get(`http://www.omdbapi.com/?apikey=b1eeb9ae&t=${slug}&y=${year}`)
            setMovie(data);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    useEffect(() => {
        getMovie();
    }, [slug, year]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Fragment>
            <Container>
                <Row className="py-5">
                    <Col lg={3}>
                        <Card className="border-0 rounded">
                            <Card.Body className="d-flex justify-content-center align-items-center">
                                <img src={movie.Poster} alt={slug} width="240" className="img-fluid rounded"/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={8}>

                        <div className="text-center text-lg-left">
                            <h2 className="font-weight-bold">{movie.Title}</h2>
                            <p className="text-muted">{movie.Genre}</p>
                        </div>

                        <Row className="py-3">
                            <Col>
                                <small className="text-muted">Release date</small>
                                <br/>
                                <small>{movie.Released}</small>
                                <br/><br/>
                                <small className="text-muted">Duration</small>
                                <br/>
                                <small>{movie.Runtime}</small>
                            </Col>
                            <Col>
                                <small className="text-muted">Directed by</small>
                                <br/>
                                <small>{movie.Director}</small>
                                <br/><br/>
                                <small className="text-muted">Casts</small>
                                <br/>
                                <small>{movie.Actors}</small>
                            </Col>
                        </Row>

                        <hr/>

                        <Row className="py-2">
                            <Col>
                                <h5>Synopsis</h5>
                                <p className="text-muted">
                                    {movie.Plot}
                                </p>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
            <div style={{ backgroundColor: "#F5F6F8" }} className="py-5">
                <Container>
                    <Row>
                        <Col xs={12} className="py-4 text-center">
                            <h3 className="font-weight-bold">Showtimes and Ticket</h3>
                        </Col>
                        <Col md={{ span: 3, offset: 3 }}>
                            <Form.Control type="date" className="showtimes-form__movie" />
                        </Col>
                        <Col md={3} className="mt-3 mt-md-0">
                            <div className="w-auto">
                                <svg className="form-icons" fill="none" stroke="#4E4B66" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <Form.Control style={{ marginTop: '-1.8rem' }} as="select" className="showtimes-form__movie">
                                <option value="Purwokerto" selected>Purwokerto</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="py-4">
                        <ShowtimesCard/>
                        <ShowtimesCard/>
                        <ShowtimesCard/>
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
