import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ loading }) => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: '0 auto',
        display: 'block'
      }}
      hidden={!loading}
    >
      <span className='sr-only'></span>
    </Spinner>
  );
};

export default Loader;
