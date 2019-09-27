import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Landingpage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/:id/account" component={Account} />
      <Route exact path="/:id/order" component={OrderList} />
      <Route exact path="/order/detail/:order_id" component={OrderDetail} />
      <Route exact path="/:id/menu" component={OwnerMenu} />
      <Route exact path="/item" component={Item} />
      <Route exact path="/item/detail/:item_id" component={Item} />
      <Route exact path="/:id/search" component={Search} />
      <Route exact path="/searchresults" component={SearchResults} />
      <Route exact path="/restaurant/detail/:restaurant_id" component={Restaurant} />
      <Route exact path="/:id/cart" component={Cart} />
    </div>
  );
};

export default Routes;
