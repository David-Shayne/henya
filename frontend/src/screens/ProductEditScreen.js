import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Carousel, Image, FormFile } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import axios from 'axios';
import {
  fetchProductDetails,
  updateProductById
} from '../actions/productActions';
import FormContainer from '../components/FormContainer';

const ProductEditScreen = ({ location, history, match }) => {
  document.title = 'Henya - Edit Product';
  const productID = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState(null);
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [currentImages, setCurrentImages] = useState();

  const { product, isLoading, error } = useSelector(
    (store) => store.productDetails
  );
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(productID));
  }, [productID, dispatch]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setCurrentImages(product.image);
    }
  }, [product]);

  const submitHandler = (e) => {
    e.preventDefault();

    setSuccess(true);

    dispatch(
      updateProductById(productID, {
        name,
        description,
        countInStock,
        price
      })
    );
    resetMessages();
  };

  const uploadFileHandler = async (e) => {
    const files = [...e.target.files];
    let formData = new FormData();
    formData.append('image', files[0]);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage([...image, data]);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const resetMessages = () => {
    setMessage(null);
  };
  return (
    <>
      <Link to='/#/admin/products' className='btn'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='my-3'>Edit Product {product.name}</h1>
        {error ? (
          <Message variant='danger' text={error} />
        ) : isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Images</Form.Label>
              <Form.File
                id='image-file'
                custom
                label='Upload image file (.png, .jpeg, .jpg)'
                accept='image/*'
                onChange={uploadFileHandler}
              />
              <p className='text-warning' style={{ margin: '1rem 0' }}>
                Upload Images one by one
              </p>
              {uploading && <Loader isLoading={uploading} />}
              <div style={{ display: 'flex', marginTop: '1rem' }}></div>
              <span style={{ color: 'red' }}>
                FILES CHOSEN WILL REPLACE ALL IMAGES
              </span>

              <div style={{ display: 'flex', marginTop: '1rem' }}>
                {product.image && (
                  <div>
                    <Form.Label>Current Images</Form.Label>
                    <Carousel interval={5000} style={{ width: '10rem' }}>
                      {product.image.map((image) => (
                        <Carousel.Item key={Math.random() * 10000}>
                          <div className='productScreen-img'>
                            <Image src={image} />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                )}
                {currentImages && (
                  <div style={{ marginLeft: '3.33rem' }}>
                    <Form.Label>New Images</Form.Label>
                    <Carousel interval={5000} style={{ width: '10rem' }}>
                      {image.map((image) => (
                        <Carousel.Item>
                          <div className='productScreen-img'>
                            <Image src={image} />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                )}
              </div>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Quantity'
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

            {message && <Message text={message} variant='danger' />}
            {success && <Message text='Product Updated!' variant='success' />}
            <Button
              type='submit'
              variant='primary'
              className='mb-3 henya-dark'
              onClick={submitHandler}
            >
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
