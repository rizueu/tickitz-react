import { useState, useEffect, Fragment } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setOrder, selectTime } from '../redux/actions/order'

const ShowtimesCard = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    let showtime = useSelector(state => state.showtimes.results)
    const [times, setTimes] = useState([])
    const [timeId, setTimeId] = useState(null)
    const [showTimeId, setShowTimeId] = useState(null)

    function getTimes() {
        axios.get(`${process.env.REACT_APP_API_URL}api/v1/times`).then(response => {
            setTimes(response.data.results)
        })
    }

    function handleOrder(index) {
        showtime["timeId"] = timeId
        dispatch(setOrder(showtime[index]))
        history.push({
            pathname: '/ticket/booking',
            showTimeId
        })
    }

    useEffect(() => {
        getTimes()
    }, [])

    return (
        <Col lg={4} className="mt-4">
            <Card style={{ borderRadius: "1rem" }} className="pb-3 border-0 showtimes-card">
                <Card.Header style={{ padding: "1.5rem", backgroundColor: "white" }}>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center">
                            <img src={props.picture} alt="cinema"/>
                        </Col>
                        <Col>
                            <h5>{props.cinemaName}</h5>
                            <small style={{ fontSize: "12px" }} className="text-muted">{props.address}</small>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="px-4">
                    <div className="schedule-show">
                        {
                            times.map((timesElement, index) => {
                                if (props.showtimes.indexOf(timesElement.showTime) !== -1) {
                                    return (
                                        <Fragment key={index}>
                                            <button 
                                            onClick={(e) => {
                                                e.preventDefault()
                                                dispatch(selectTime(timesElement.showTime))
                                                axios.get(`${process.env.REACT_APP_API_URL}api/v1/times/id?showTime=${timesElement.showTime}`).then(response => {
                                                    setTimeId(response.data.results)
                                                })
                                                axios.get(`${process.env.REACT_APP_API_URL}api/v1/selected-showtime?showTimeDate=${props.showTimeDate}&timeId=${timeId}&cinemaId=${props.cinemaId}&movieId=${props.movieId}`).then(response => setShowTimeId(response.data.results.showTimeId))
                                            }} 
                                            className="btn text-muted"
                                            >
                                                {timesElement.showTime}
                                            </button>
                                        </Fragment>
                                    )
                                } else {
                                    return (
                                        <Fragment key={index}>
                                            <button
                                            className="btn text-muted"
                                            disabled>
                                                {timesElement.showTime}
                                            </button>
                                        </Fragment>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="price-section">
                        <p className="text-muted">Price</p>
                        <p className="font-weight-bold">Rp.{props.price}/seat</p>
                    </div>
                    <div className="d-flex justify-content-between">
                       {
                           (showTimeId !== null) ? (
                            <Button onClick={e => {
                                e.preventDefault()
                                handleOrder(props.indexShowTime)
                            }} className="btn btn-primary w-100 mr-3">Book now</Button>
                           ) : (
                            <Button className="btn btn-primary w-100 mr-3 disabled">Book now</Button>
                           )
                       }
                        <Link to="#" className="btn btn-outline-primary w-100">Add to cart</Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ShowtimesCard
