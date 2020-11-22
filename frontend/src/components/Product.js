import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <Card key={product._id} className='product my-3 p-3 rounded'>
      <div className='landing-product'>
        <Link to={`/product/${product._id}`}>
          <Card.Img variant='top' src={product.image[0]} />
        </Link>
      </div>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            numReviews={product.numReviews}
            key={product._id}
          />
        </Card.Text>
        <Card.Text as='h3'>{currency.format(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
