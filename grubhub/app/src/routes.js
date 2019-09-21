import React from 'react';
import { Route } from 'react-router-dom';
import Landingpage from './components/Landing Page/LandingPage';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Account from './components/Account/Account';
import Order from './components/Order/Orderowner';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Landingpage} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/:id/account" component={Account} />
      <Route path="/:id/order" component={Order} />
    </div>
  );
};

export default Routes;
