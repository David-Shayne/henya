import React from 'react';
//External components
import { HashRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
//Internal components
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import Product from './screens/ProductScreen';
import Cart from './screens/CartScreen';
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import Profile from './screens/ProfileScreen';
import Shipping from './screens/ShippingScreen';
import Payment from './screens/PaymentScreen';
import OrderAdd from './screens/OrderAddScreen';
import Order from './screens/OrderScreen';
import Users from './screens/UsersScreen';
import UserEdit from './screens/UserEditScreen';
import Products from './screens/ProductsScreen';
import ProductEdit from './screens/ProductEditScreen';
import ProductCreate from './screens/ProductCreateScreen';
import Orders from './screens/OrdersScreen';
import About from './screens/About';
import Contact from './screens/Contact';
import ProductCarousel from './screens/ProductCarouselScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={ProductCarousel} exact />
          <Route path='/products' component={HomeScreen} exact />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/payment' component={Payment} />
          <Route path='/order' component={OrderAdd} />
          <Route path='/orders/:id' component={Order} />
          <Route path='/admin/users' component={Users} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
          <Route path='/admin/products' component={Products} />
          <Route path='/admin/product/:id/edit' component={ProductEdit} />
          <Route path='/admin/product/create' component={ProductCreate} />
          <Route path='/admin/orders' component={Orders} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
