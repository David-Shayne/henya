import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteProductById, fetchProducts } from '../actions/productActions';
import moment from 'moment';

const ProductsScreen = ({ location }) => {
  document.title = 'Henya - Products List';

  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector((store) => store.products);
  const { userInfo } = useSelector((store) => store.userLogin);
  const { success } = useSelector((store) => store.userDelete);

  const currency = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, success]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      window.location.pathname = '/';
    }
  }, [userInfo]);

  const deleteHandler = async (product) => {
    let confirmed = await window.confirm(
      `Are you sure you want to delete the product ${product.name}`
    );
    if (confirmed) {
      dispatch(deleteProductById(product._id));
      window.location.push('/admin/products');
    } else {
      alert('Deletion cancelled');
    }
  };
  return error ? (
    <Message variant='danger' text={error} />
  ) : isLoading ? (
    <Loader loading={isLoading} />
  ) : (
    <>
      <h1 className='mb-3'>
        <span>Products List - </span>
        <i className='text-danger'>{'[ADMIN]'}</i>
      </h1>

      <LinkContainer
        to={`/admin/product/create`}
        style={{ marginBottom: '1rem' }}
      >
        <Button className='henya-dark'>
          <span>Create Product </span>
          <i className='fas fa-plus' />
        </Button>
      </LinkContainer>

      <Table
        striped
        hover
        responsive
        size='sm'
        style={{ border: '1px solid rgba(0,0,0,0.1)' }}
      >
        <th className='text-center'>ID</th>
        <th className='text-center'>Image(s)</th>
        <th className='text-center'>Name</th>
        <th className='text-center'>Create Date</th>
        <th className='text-center'>Price</th>
        <th className='text-center'>Quantity</th>
        <th className='text-center'>Edit</th>
        <th className='text-center'>Delete</th>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className='text-center'>{product._id}</td>
              <td className='text-center'>
                <Carousel interval={5000} style={{ width: '8rem' }}>
                  {product.image.map((image) => (
                    <Carousel.Item>
                      <div className='productScreen-img'>
                        <Image src={image} />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </td>
              <td className='text-center'>{product.name}</td>

              <td className='text-center'>{`${moment(product.createdAt).format(
                'DD MMM YYYY'
              )}`}</td>
              <td className='text-center'>{currency.format(product.price)}</td>
              <td className='text-center'>{product.countInStock}</td>
              <td className='text-center'>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button className='henya-dark'>
                    <i className='fas fa-edit' />
                  </Button>
                </LinkContainer>
              </td>
              <td className='text-center'>
                <Button variant='danger' onClick={() => deleteHandler(product)}>
                  <i className='fas fa-trash' />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductsScreen;
