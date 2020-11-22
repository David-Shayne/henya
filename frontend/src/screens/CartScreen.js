import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, ListGroup, Card } from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import CartItemsList from '../components/CartItemsList';

const CartScreen = ({ match, location, history }) => {
  document.title = 'Henya - Cart';
  const productID = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, quantity));
    }
  }, [dispatch, productID, quantity]);

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div>
      <CheckoutSteps onStep={1} />
      <Row className='my-3'>
        <Col md={8}>
          <h1 className='mb-3'>Shopping Cart</h1>
          <CartItemsList />
        </Col>
        <Col md={4} className='mt-auto'>
          <Card>
            <ListGroup variant='flush text-center'>
              <ListGroup.Item>
                <h2 className='p-3'>
                  Subtotal (
                  {cartItems.reduce((total, item) => {
                    return total + item.quantity;
                  }, 0)}
                  ) items
                </h2>
                <strong>
                  {currency.format(
                    cartItems.reduce((total, item) => {
                      return total + item.quantity * item.price;
                    }, 0)
                  )}
                </strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block henya-dark'
                  disabled={cartItems.length <= 0}
                  onClick={checkoutHandler}
                >
                  Continue to Shipping
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
