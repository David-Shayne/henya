import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from './Message';

const CartItemsList = ({ order, orderItems }) => {
  const dispatch = useDispatch();

  let { cartItems } = useSelector((store) => store.cart);

  if (orderItems) {
    cartItems = orderItems;
  }

  const addToCartHandler = (e, item) => {
    dispatch(addToCart(item._id, Number(e.target.value)));
  };
  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item._id));
  };

  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <ListGroup variant='flush'>
      {cartItems.length >= 1 ? (
        cartItems.map((item) => (
          <ListGroup.Item key={item._id}>
            <Row className='align-items-center'>
              <Col md={2}>
                <Image src={item.image[0]} alt={item.name} fluid rounded />
              </Col>

              <Col md={4}>
                <Link to={`/product/${item._id}`}>
                  <h5 className='m-0'>{item.name}</h5>
                </Link>
              </Col>
              {!order ? (
                <>
                  <Col md={2}>
                    <p className='m-0'>{currency.format(item.price)}</p>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) => {
                        addToCartHandler(e, item);
                      }}
                    >
                      {/* Creates a list from countInStock then maps over it's values to create options */}
                      {[...Array(item.countInStock).keys()].map((number) => (
                        <option key={number + 1} value={number + 1}>
                          {number + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      className='bg-transparent'
                      onClick={() => removeFromCartHandler(item)}
                    >
                      <i className='fas fa-trash' style={{ color: 'black' }} />
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col
                    md={orderItems ? 6 : 4}
                    className='p-0 m-0'
                    style={{ textAlign: 'left' }}
                  >
                    <p className='m-0 p-0'>
                      {item.quantity} x {currency.format(item.price)} ={' '}
                      {currency.format(item.quantity * item.price)}
                    </p>
                  </Col>
                  {!orderItems && (
                    <Col md={2} style={{ textAlign: 'right' }}>
                      <Link to='/cart'>Edit</Link>
                    </Col>
                  )}
                </>
              )}
            </Row>
          </ListGroup.Item>
        ))
      ) : (
        <Message>
          No items in cart {'>'} <Link to='/'>Browse</Link>
        </Message>
      )}
    </ListGroup>
  );
};

CartItemsList.defaultProps = {
  cartItems: null
};
export default CartItemsList;
