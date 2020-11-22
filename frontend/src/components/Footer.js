import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
function Footer() {
  return (
    <footer>
      <Container className='p-3' style={{ marginTop: '5vh' }}>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Henya (Pty) Ltd
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
