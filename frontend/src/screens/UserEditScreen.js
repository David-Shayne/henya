import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUser,
  updateUserById
} from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const UserEditScreen = ({ location, history, match }) => {
  document.title = 'Henya - Edit User';
  const userID = match.params.id;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const { user, isLoading, error } = useSelector((store) => store.userDetails);
  const { userInfo } = useSelector((store) => store.userLogin);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails(userID));
  }, [userID, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password) {
      if (confirmPassword !== password) {
        setMessage('Passwords do not match');
      } else {
        resetMessages();
        setSuccess(true);
        dispatch(updateUserById(userID, { name, email, password, isAdmin }));
        if (user._id === userInfo._id) {
          dispatch(updateUser({ _id: user._id, name, email, password }));
        }
      }
    } else {
      setSuccess(true);
      dispatch(updateUserById(userID, { name, email, isAdmin }));

      if (user._id === userInfo._id) {
        dispatch(updateUser({ _id: user._id, name, email }));
      }
    }
  };

  const resetMessages = () => {
    setMessage(null);
  };
  return (
    <>
      <Link to='/#/admin/users' className='btn'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='my-3'>Edit User {user.name}</h1>
        {error ? (
          <Message variant='danger' text={error} />
        ) : isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
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
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='isAdminCheck'>
              <Form.Label>Set as admin?</Form.Label>
              <Form.Control
                as='select'
                value={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.value);
                }}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </Form.Control>
            </Form.Group>
            {message && <Message text={message} variant='danger' />}
            {success && <Message text='User Updated!' variant='success' />}
            <Button
              type='submit'
              variant='primary'
              className='mb-3 henya-dark'
              onClick={submitHandler}
            >
              Update user
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
