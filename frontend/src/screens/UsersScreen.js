import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUsers, deleteUser } from '../actions/userActions';
import moment from 'moment';

const UsersScreen = () => {
  document.title = 'Henya - User List';

  const dispatch = useDispatch();

  const { users, isLoading, error } = useSelector((store) => store.users);
  const { userInfo } = useSelector((store) => store.userLogin);
  const { success } = useSelector((store) => store.userDelete);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, success]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      window.location.pathname = '/';
    }
  }, [userInfo]);

  const deleteHandler = async (user) => {
    let confirmed = await window.confirm(
      `Are you sure you want to delete the user ${user.name}`
    );
    if (confirmed) {
      dispatch(deleteUser(user._id));
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
        <span>User List - </span>
        <i className='text-danger'>{'[ADMIN]'}</i>
      </h1>

      <Table
        striped
        hover
        responsive
        size='sm'
        style={{ border: '1px solid rgba(0,0,0,0.1)' }}
      >
        <th className='text-center'>ID</th>
        <th className='text-center'>Username</th>
        <th className='text-center'>Email</th>
        <th className='text-center'>Register Date</th>
        <th className='text-center'>Admin?</th>
        <th className='text-center'>Edit</th>
        <th className='text-center'>Delete</th>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className='text-center'>{user._id}</td>
              <td className='text-center'>{user.name}</td>
              <td className='text-center'>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td className='text-center'>{`${moment(user.createdAt).format(
                'DD MMM YYYY'
              )}`}</td>
              <td className='text-center'>
                {user.isAdmin ? (
                  <i className='fa fa-check text-success' />
                ) : (
                  <i className='fa fa-remove text-danger' />
                )}
              </td>

              <td className='text-center'>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button className='henya-dark'>
                    <i className='fas fa-edit' />
                  </Button>
                </LinkContainer>
              </td>
              <td className='text-center'>
                <Button variant='danger' onClick={() => deleteHandler(user)}>
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

export default UsersScreen;
