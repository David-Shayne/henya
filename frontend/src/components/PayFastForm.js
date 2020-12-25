import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const PayFastForm = () => {
  const { totalPrice, user, _id, isPaid } = useSelector(
    (store) => store.order.order
  );
  const hostUrl = 'http://www.henya.co.za';

  const merchant_id = '16634696';
  const merchant_key = 'wkl2i3dvpx4b6';
  const item_name = `Henya Order ID: ${_id}`;
  const return_url = `${hostUrl}/#/orders/${_id}?status=success`;
  const cancel_url = `${hostUrl}/#/orders/${_id}?status=cancelled`;
  const notify_url = `${hostUrl}/api/orders/${_id}/pay`;
  const name_first = user.name;
  const email_address = user.email;
  const amount = Math.floor(totalPrice);
  const m_payment_id = `${_id}//sEcur_e`;

  const params = new URLSearchParams({
    merchant_id,
    merchant_key,
    amount,
    item_name,
    return_url,
    cancel_url,
    notify_url,
    name_first,
    email_address,
    m_payment_id
  });

  const redirect = `https://www.payfast.co.za/eng/process?${params.toString()}`;

  const submitHandler = () => {
    window.location.replace(redirect);
  };

  return (
    <Button
      onClick={submitHandler}
      className='my-3 henya-dark btn-block'
      disabled={isPaid}
    >
      {isPaid ? 'Already Paid' : 'Pay Now'}
    </Button>
  );
};

export default PayFastForm;
