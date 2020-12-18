import React from 'react';
import { Card, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product, carouselItem }) => {
  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <Card key={product._id} className='product my-3 p-3 rounded border-0'>
      <div className='landing-product'>
        <Link to={`/product/${product._id}`}>
          <Carousel interval={1000000}>
            {product.image.map((imageSrc) => (
              <Carousel.Item>
                <Image src={imageSrc} style={{ height: '10rem' }} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Link>
      </div>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='h3'>{currency.format(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
