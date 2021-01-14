import { useState } from 'react';
import { Col, Nav, Card } from 'react-bootstrap';

const ChartCard = () => {
    const [selectedPage, setSelectedPage] = useState('weekly')

    return (
        <Col md={4} className="mt-4">
            <Card style={{ borderRadius: "1rem" }} className="border-0">
                <Card.Body className="p-5">
                    <h6 className="font-weight-bold">Anvengers: End Game</h6>
                    <Nav
                        defaultActiveKey="weekly"
                        onSelect={currentPage => {
                            setSelectedPage(currentPage);
                        }}    
                    >
                        <Nav.Item className="navbar-item">
                            <Nav.Link eventKey="weekly" className="text-muted"><small>Weekly</small></Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navbar-item">
                            <Nav.Link eventKey="monthly" className="text-muted"><small>Monthly</small></Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navbar-item">
                            <Nav.Link eventKey="yearly" className="text-muted"><small>Yearly</small></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {
                        selectedPage === 'weekly' ? '' : selectedPage === 'monthly' ? '' : selectedPage === 'yearly' ? '' : ''
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ChartCard
