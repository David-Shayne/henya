import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, text, children }) => {
  return <Alert variant={variant}>{text ? text : children}</Alert>;
};

Message.defaultProps = {
  variant: 'info'
};
export default Message;
