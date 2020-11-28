import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CartItemsList from '../components/CartItemsList';
import { getOrder } from '../actions/orderActions';
import PayFastForm from '../components/PayFastForm';
import moment from 'moment';
import axios from 'axios';

const OrderScreen = ({ history, match, location }) => {
  document.title = 'Henya - Order Details';
  const orderID = match.params.id;
  const status = location.search ? String(location.search.split('=')[1]) : null;
  const dispatch = useDispatch();

  const { userInfo } = useSelector((store) => store.userLogin);
  const { order, isLoading, error } = useSelector((store) => store.order);

  useEffect(() => {
    if (!order || order._id !== orderID) {
      dispatch(getOrder(orderID));
    }
    if (!userInfo) {
      history.push(`/login?redirect=${window.location.pathname}`);
    }
  }, [dispatch, orderID, order, userInfo, history]);

  const markDeliveredHandler = async () => {
    //Setting content as json in headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token
      }
    };
    await axios.post(`/api/orders/${order._id}/delivered`, {}, config);
    dispatch(getOrder(order._id));
  };
  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return isLoading ? (
    <Loader loading={isLoading} />
  ) : error ? (
    <Message text={error} variant='danger' />
  ) : (
    <>
      {status && (
        <Message
          text={`Payment ${status.toUpperCase()}`}
          variant={status == 'success' ? 'success' : 'danger'}
        />
      )}
      <h1 className='py-3'>
        Order: <i>{order._id}</i>
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='order-screen-list-item'>
              <h1>Shipping</h1>

              <span>
                <strong>Name: </strong>
                <i>{order.user.name}</i>
              </span>
              <p>
                <strong>Email: </strong>
                <i>
                  <a
                    href={`mailto:${
                      order.user.isGuest ? order.email : order.user.email
                    }`}
                  >
                    {order.user.isGuest ? order.email : order.user.email}
                  </a>
                </i>
              </p>
              {order.shipping.address === 'collect' ? (
                <p>
                  <strong>Collection</strong>
                </p>
              ) : (
                <>
                  <span>
                    <strong>Address: </strong>
                    <i>{order.shipping.address}</i>
                  </span>
                  <p>
                    <strong>Postal Code: </strong>
                    <i>{order.shipping.postalCode}</i>
                  </p>
                </>
              )}

              <p>
                {order.isDelivered ? (
                  <Message
                    variant='success'
                    text={`Delivered on ${order.deliveredAt}`}
                  />
                ) : (
                  <>
                    <Message variant='warning' text='Not delivered' />
                    {userInfo.isAdmin && (
                      <Button onClick={markDeliveredHandler}>
                        Mark as delivered
                      </Button>
                    )}
                  </>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='order-screen-list-item mt-3'>
              <h1>Payment</h1>
              <p>
                <strong>Method: </strong>
                <i>
                  {order.paymentMethod === 'paypal'
                    ? 'PayPal or Card'
                    : order.paymentMethod}
                </i>
              </p>
              {order.isPaid ? (
                <Message
                  variant='success'
                  text={`Paid on ${moment(order.paidAt)}`}
                />
              ) : (
                <Message variant='danger' text='Not paid' />
              )}
            </ListGroup.Item>
            <ListGroup.Item className='order-screen-list-item mt-3'>
              <h1>Items</h1>
              <CartItemsList order orderItems={order.orderItems} />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup varaint='flush' className='text-center'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>
                  Items(
                  {order.orderItems.reduce((total, current) => {
                    return total + current.quantity;
                  }, 0)}
                  ):
                </Col>
                <Col style={{ textAlign: 'right' }}>
                  {currency.format(order.itemsPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col style={{ textAlign: 'right' }}>
                  {currency.format(order.shippingPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h4 className='m-0 p-0'>Total:</h4>
                </Col>
                <Col
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'right'
                  }}
                >
                  {currency.format(order.totalPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
          </Card>
          <PayFastForm />
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
