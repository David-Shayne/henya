import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';
import moment from 'moment';

const ProfileScreen = ({ history }) => {
  document.title = 'Henya - Profile';
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);

  const { error, isLoading } = useSelector((store) => store.userDetails);
  const { userInfo } = useSelector((store) => store.userLogin);
  const { success, error: updateError } = useSelector(
    (store) => store.userUpdate
  );
  const myOrders = useSelector((store) => store.myOrders);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.name) {
        //Merges userDetails with local state
        setName(userInfo.name);
        setEmail(userInfo.email);
      } else {
        //Grabs user profile details
        dispatch(getUserDetails('profile'));
      }
    } else {
      //Redirects to login page
      history.push('/login?redirect=profile');
    }
  }, [history, userInfo, dispatch]);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    resetMessages();
    if (confirmPassword === password) {
      dispatch(updateUser({ name, email, password }));
      setPassword('');
      setConfirmPassword('');
    } else {
      setMessage('Passwords do not match');
    }
  };

  const resetMessages = () => {
    setMessage(null);
  };

  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const detailsHandler = (order) => {
    history.push(`/orders/${order._id}`);
  };
  return (
    <Row className='my-3'>
      <Col md={3}>
        <h1 className='mb-4'>My Profile</h1>

        {error && <Message variant='danger' text={error} />}
        {success && <Message variant='success' text='Profile updated!' />}
        {updateError && <Message variant='danger' text={updateError} />}
        {isLoading && <Loader loading={isLoading} />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Username</Form.Label>
            <Form.Control
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
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>New Password</Form.Label>
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
          {message && <Message text={message} variant='danger' />}
          <Button
            type='submit'
            variant='primary'
            className='mb-3 henya-dark'
            onClick={resetMessages}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1 className='mb-4'>My Orders</h1>
        {myOrders.isLoading && <Loader loading={myOrders.isLoading} />}
        {myOrders.error && <Message variant='danger' text={myOrders.error} />}
        {myOrders.orders && myOrders.orders.length >= 1 && (
          <Table
            striped
            hover
            bordered
            responsive
            size='sm'
            style={{ border: '1px solid rgba(0,0,0,0.1)' }}
          >
            <th className='text-center'>ID</th>
            <th className='text-center'>Date</th>
            <th className='text-center'>Total</th>
            <th className='text-center'>Paid?</th>
            <th className='text-center'>Delivered?</th>
            <th className='text-center'>Details</th>

            <tbody>
              {myOrders.orders.map((order) => (
                <tr key={order._id}>
                  <td className='text-center'>{order._id}</td>
                  <td className='text-center'>
                    <span>{moment(order.createdAt).format('Do MMM YYYY')}</span>
                    <p className='my-0 mt-1'>
                      {moment(order.createdAt).format('h:mm A')}
                    </p>
                  </td>
                  <td className='text-center'>
                    {currency.format(order.totalPrice)}
                  </td>
                  <td className='text-center'>
                    {order.isPaid ? (
                      <i className='fa fa-check text-success' />
                    ) : (
                      <i className='fa fa-remove text-danger' />
                    )}
                  </td>
                  <td className='text-center'>
                    {order.isDelivered ? (
                      <i className='fa fa-check text-success' />
                    ) : (
                      <i className='fa fa-remove text-danger' />
                    )}
                  </td>
                  <td className='text-center'>
                    <Button
                      className='henya-dark'
                      onClick={() => detailsHandler(order)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
