import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Button, Col, ListGroup, Card } from 'react-bootstrap';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import CartItemsList from '../components/CartItemsList';
import { createOrder } from '../actions/orderActions';
import { removeAllFromCart } from '../actions/cartActions';

const OrderAddScreen = ({ history }) => {
  document.title = 'Henya - Add Order';
  const dispatch = useDispatch();

  const { cartItems, shipping, paymentMethod } = useSelector(
    (store) => store.cart
  );
  const { userInfo } = useSelector((store) => store.userLogin);
  const { order, success, error } = useSelector((store) => store.orderCreate);

  useEffect(() => {
    if (!userInfo) {
      history.push('/#/');
    }
  }, [userInfo, cartItems, history]);

  useEffect(() => {
    if (success && !cartItems[0]) {
      history.push(`/#/orders/${order._id}`);
    }
  }, [history, success, order, cartItems]);

  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const itemsPrice = Number(
    cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0)
  );
  const shippingPrice =
    shipping.address === 'collect' ? 0 : itemsPrice <= 1000 ? 150 : 0;
  const totalPrice = shippingPrice + itemsPrice;

  const placeOrderHandler = () => {
    if (shipping.email) {
      dispatch(
        createOrder({
          orderItems: cartItems,
          shipping,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          email: shipping.email
        })
      );
    } else {
      dispatch(
        createOrder({
          orderItems: cartItems,
          shipping,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice
        })
      );
    }

    dispatch(removeAllFromCart());
  };
  return (
    <div>
      <CheckoutSteps onStep={4} />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='order-screen-list-item'>
              <h1>Shipping</h1>
              {shipping.address === 'collect' ? (
                <span>
                  <strong>Collection</strong>
                </span>
              ) : (
                <>
                  <span>
                    <strong>Address: </strong>
                    <i>{shipping.address}</i>
                  </span>
                  <p>
                    <strong>Postal Code: </strong>
                    <i>{shipping.postalCode}</i>
                  </p>
                </>
              )}
            </ListGroup.Item>
            <ListGroup.Item className='order-screen-list-item mt-3'>
              <h1>Payment</h1>
              <p>
                <strong>Method: </strong>
                <i>
                  {paymentMethod === 'paypal'
                    ? 'PayPal or Card'
                    : paymentMethod}
                </i>
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='order-screen-list-item mt-3'>
              <h1>Selected Items</h1>
              <CartItemsList order />
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
                  {cartItems.reduce((total, current) => {
                    return total + current.quantity;
                  }, 0)}
                  ):
                </Col>
                <Col style={{ textAlign: 'right' }}>
                  {currency.format(itemsPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col style={{ textAlign: 'right' }}>
                  {currency.format(shippingPrice)}
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
                  {currency.format(totalPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant='danger' text={error} />}
              <Button
                disabled={!cartItems[0]}
                type='button'
                variant='primary'
                className='mt-1 henya-dark btn-block'
                onClick={placeOrderHandler}
              >
                place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderAddScreen;
