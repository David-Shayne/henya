import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({ location, history }) => {
  document.title = 'Henya - Register';
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((store) => store.userRegister);
  const userLogin = useSelector((store) => store.userLogin);
  const { isLoading, error } = userRegister;
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      dispatch(register(name, email, password));
    } else {
      setMessage('Passwords do not match');
    }
  };

  const resetMessages = () => {
    setMessage(null);
  };
  return (
    <FormContainer>
      <h1 className='my-3'>Register</h1>

      {error && <Message variant='danger' text={error} />}
      {isLoading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter email'
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
            placeholder='Enter password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='confimPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Group>
        {message && <Message text={message} variant='danger' />}
        <Button
          type='submit'
          variant='primary'
          className='mb-3 henya-dark'
          onClick={resetMessages}
        >
          Create Account
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Have an account? Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
