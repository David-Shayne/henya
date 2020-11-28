import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Row,
  ListGroup,
  Card,
  Button,
  Col,
  Form,
  Image,
  Carousel
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen({ history, match }) {
  document.title = 'Henya - Product Details';
  const [quantity, setQuantity] = useState('1');

  const dispatch = useDispatch();

  const productDetails = useSelector((store) => store.productDetails);
  const { product, isLoading, error } = productDetails;
  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));
  }, [dispatch, match, history]);

  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const addToCartHandler = () => {
    history.push(`/#/cart/${match.params.id}?quantity=${quantity}`);
  };
  const inStock = product.countInStock > 0;
  return (
    <div>
      <LinkContainer to='/'>
        <Button className='btn my-3 bg-transparent'>Go Back</Button>
      </LinkContainer>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : error ? (
        <Message variant='danger' text={error} />
      ) : (
        <Row>
          <Col md={6}>
            {product.image && (
              <Carousel interval={5000}>
                {product.image.map((image) => (
                  <Carousel.Item>
                    <div className='productScreen-img'>
                      <Image src={image} />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </Col>

          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  numReviews={product.numReviews}
                  newLine={false}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Price: {currency.format(product.price)}
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col style={{ fontWeight: 'bold' }}>
                      {currency.format(product.price)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {inStock ? 'In Stock ' : 'Out Of Stock '}
                      <i
                        className='fas fa-dot-circle'
                        style={{
                          color: inStock ? 'green' : 'red'
                        }}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                {inStock && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        >
                          {/* Creates a list from countInStock then maps over it's values to create options */}
                          {[...Array(product.countInStock).keys()].map(
                            (number) => (
                              <option key={number + 1} value={number + 1}>
                                {number + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block henya-dark'
                    type='button'
                    disabled={!inStock}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
