import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
  document.title = 'Henya - Shipping';
  const dispatch = useDispatch();
  const { shipping } = useSelector((store) => store.cart);
  const { userInfo } = useSelector((store) => store.userLogin);

  const [address, setAddress] = useState(shipping.address);
  const [postalCode, setPostalCode] = useState(shipping.postalCode);
  const [email, setEmail] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo.isGuest) {
      dispatch(saveShipping({ address, postalCode, email }));
    } else {
      dispatch(saveShipping({ address, postalCode }));
    }

    history.push('/#/payment');
  };
  return (
    <>
      <CheckoutSteps onStep={2} />
      <FormContainer>
        <h1 className='my-3'>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
          </Form.Group>
          <p
            className='my-3'
            style={{ color: 'black', opacity: '0.8', fontSize: '1.2rem' }}
          >
            OR
          </p>
          <Form.Group controlId='collect'>
            <Form.Check
              type='checkbox'
              value='collect'
              label='Collect?'
              onChange={(e) => {
                setAddress(e.target.value);
                setPostalCode('0000');
              }}
            />
          </Form.Group>
          {userInfo.isGuest && (
            <Form.Group controlId='email'>
              <Form.Label>Email for guest order</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
          )}
          <Button type='submit' variant='primary' className='mt-1 henya-dark'>
            Continue to payment
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
