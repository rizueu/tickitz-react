import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import Ticket from '../components/Ticket';
import qrcode from '../images/qrCode.png';

const Proof = () => {
    const order = useSelector(state => state.order)

    return (
        <div style={{ backgroundColor: "#F6F6F8" }} className="py-5">
            <div className="d-flex justify-content-center align-items-center">
                <Card className="rounded border-0">
                    <Card.Body className="d-flex justify-content-center align-items-center flex-column px-5">
                        <h5 className="font-weight-bold my-4">Proof of Payment</h5>
                        <Ticket
                            title={order.movieTitle}
                            date="07 July" 
                            time={order.ticketTime} 
                            category={order.category}
                            count={`${order.ticketCount} pieces`} 
                            seats={order.seats.join(', ')}
                            price={`Rp. ${order.totalPayment}`}
                            qrcode={qrcode}
                        />
                        <div className="d-flex ticket-button my-4">
                            <Button style={{ color: "#000" }} variant="outline-secondary" className="mr-2">
                                Download
                            </Button>
                            <Button style={{ color: "#000" }} variant="outline-secondary">
                                Print
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Proof
