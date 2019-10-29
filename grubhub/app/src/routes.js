import React from 'react';
import { Route } from 'react-router-dom';
import {PrivateRoute} from './privateRoute';
import Landingpage from './components/Landing Page/LandingPage';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Account from './components/Account/Account';
import OrderList from './components/Order/Orderlist';
import OrderDetail from './components/Order/Orderdetail';
import OwnerMenu from './components/Menu/OwnerMenu';
import Item from './components/Item/Item';
import Search from './components/Search/Search';
import SearchResults from './components/Search/SearchResults';
import Restaurant from './components/Restaurant/Restaurant';
import Cart from './components/Cart/Cart';
import UpcomingOrderlist from './components/Order/UpcomingOrderlist';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Landingpage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/:id/account" component={Account} />
      <PrivateRoute exact path="/:id/order" component={OrderList} />
      <PrivateRoute exact path="/:id/currentorder" component={UpcomingOrderlist} />
      <PrivateRoute exact path="/order/detail/:order_id" component={OrderDetail} />
      <PrivateRoute exact path="/:id/menu" component={OwnerMenu} />
      <PrivateRoute exact path="/item" component={Item} />
      <PrivateRoute exact path="/item/detail/:item_id" component={Item} />
      <PrivateRoute exact path="/:id/search" component={Search} />
      <PrivateRoute exact path="/searchresults" component={SearchResults} />
      <PrivateRoute exact path="/restaurant/detail/:restaurant_id" component={Restaurant} />
      <PrivateRoute exact path="/:id/cart" component={Cart} />
    </div>
  );
};

export default Routes;
