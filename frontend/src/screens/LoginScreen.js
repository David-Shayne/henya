import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ location, history }) => {
  document.title = 'Henya - Login';
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((store) => store.userLogin);
  const { isLoading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className='my-3'>Sign In</h1>

      {error && <Message variant='danger' text={error} />}
      {isLoading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter email...'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter password...'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='mb-3 henya-dark'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            New customer? Register
          </Link>
        </Col>
      </Row>
      <span style={{ marginRight: '1rem' }}>Or</span>
      <Button
        type='submit'
        variant='primary'
        className='mb-3'
        onClick={() => dispatch(login('guest@henya.org', 'guest123'))}
      >
        Continue as guest
      </Button>
    </FormContainer>
  );
};

export default LoginScreen;
