import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const CheckoutSteps = ({ onStep }) => {
  let steps = [
    { name: 'Cart', link: '/cart' },
    { name: 'Shipping', link: '/shipping' },
    { name: 'Payment', link: '/payment' },
    { name: 'Place Order', link: '/order' }
  ];

  return (
    <Nav className='justify-content-center my-3 mb-4 checkout-steps-container'>
      {steps.map((step, index) => (
        <LinkContainer to={step.link} className='checkout-step'>
          <Nav.Link disabled={index + 1 > onStep ? true : false}>
            {step.name}
          </Nav.Link>
        </LinkContainer>
      ))}
    </Nav>
  );
};

export default CheckoutSteps;
