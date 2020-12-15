import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
//Components
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

function HomeScreen({ match }) {
  document.title = 'Henya - Home';
  const dispatch = useDispatch();

  const productsState = useSelector((store) => store.products);
  const { isLoading, error, products } = productsState;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <h1 className='my-3'>Latest Products</h1>

      {isLoading ? (
        <Loader loading={isLoading} />
      ) : error ? (
        <Message variant='danger' text={error} />
      ) : (
        <Row className='product-row'>
          {products
            ? products.map((product) => (
                <Col sm={12} md={6} lg={3} xl={3} key={product._id}>
                  <Product product={product} carouselItem={false} />
                </Col>
              ))
            : null}
        </Row>
      )}
    </>
  );
}

export default HomeScreen;
