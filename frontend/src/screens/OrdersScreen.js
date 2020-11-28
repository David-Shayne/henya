import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getAllOrders } from '../actions/orderActions';
import moment from 'moment';

const OrdersScreen = ({ history }) => {
  document.title = 'Henya - Orders List';

  const dispatch = useDispatch();

  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const { orders, isLoading, error } = useSelector((store) => store.myOrders);
  const { userInfo } = useSelector((store) => store.userLogin);
  const { success } = useSelector((store) => store.userDelete);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, success]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      window.location.pathname = '/';
    }
  }, [userInfo]);

  const detailsHandler = (order) => {
    history.push(`/orders/${order._id}`);
  };

  return error ? (
    <Message variant='danger' text={error} />
  ) : isLoading ? (
    <Loader loading={isLoading} />
  ) : (
    <>
      <h1 className='mb-3'>
        <span>Orders List - </span>
        <i className='text-danger'>{'[ADMIN]'}</i>
      </h1>

      <Table
        striped
        hover
        responsive
        size='sm'
        style={{ border: '1px solid rgba(0,0,0,0.1)' }}
      >
        <th className='text-center'>ID</th>
        <th className='text-center'>User</th>
        <th className='text-center'>Date</th>
        <th className='text-center'>Total</th>
        <th className='text-center'>Paid?</th>
        <th className='text-center'>Delivered?</th>
        <th className='text-center'>Details</th>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className='text-center'>{order._id}</td>
              <td className='text-center'>{order.user.name}</td>
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
    </>
  );
};

export default OrdersScreen;
