import React from 'react';
import { Route } from 'react-router-dom';
import Landingpage from './components/Landing Page/LandingPage';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Account from './components/Account/Account';
import OrderList from './components/Order/Orderowner';
import OrderDetail from './components/Order/Orderdetail';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Landingpage} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/:id/account" component={Account} />
      <Route path="/:id/order" component={OrderList} />
      <Route path="/order/detail/:order_id" component={OrderDetail} />
    </div>
  );
};

export default Routes;
