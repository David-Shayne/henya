import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  document.title = 'Henya - Payment';
  const dispatch = useDispatch();
  const { shipping } = useSelector((store) => store.cart);

  if (!shipping.address) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('payfast');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/order');
  };
  return (
    <>
      <CheckoutSteps onStep={3} />
      <FormContainer>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='paymentMethod' className='mb-0 mt-3'>
            <Form.Label
              className='my-0'
              as='legend'
              style={{ fontSize: '150%' }}
            >
              Select Method
            </Form.Label>
          </Form.Group>
          <Col>
            <Form.Group>
              <Form.Check
                className='mt-2'
                type='radio'
                label={'PayFast or Card'}
                id='payfast'
                name='paymentMethod'
                value='payfast'
                checked
                inline
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <i className='fas fa-credit-card mr-1'></i>
              <i className='fab fa-cc-mastercard mr-1'></i>
            </Form.Group>
          </Col>

          <Button type='submit' variant='primary' className='mt-1 henya-dark'>
            Continue to place order
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
