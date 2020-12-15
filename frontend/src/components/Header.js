import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Image
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

function Header({ history }) {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((store) => store.cart);
  const { userInfo } = useSelector((store) => store.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header>
      <Navbar
        variant='dark'
        bg='dark'
        expand='lg'
        collapseOnSelect
        className='henya-header'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image src='/images/logo.svg' style={{ width: '7rem' }} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/products'>
                <Nav.Link>Latest Products</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/contact' style={{ marginRight: '1rem' }}>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart' className='cart-link-container'>
                <Nav.Link>
                  {cartItems.length > 0 ? (
                    <Badge pill variant='light' className='cart-pill'>
                      {cartItems.length}
                    </Badge>
                  ) : null}
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    {!userInfo.isGuest ? (
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                    ) : null}

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>{' '}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>User List</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/products'>
                        <NavDropdown.Item>Product List</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item>Orders List</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
