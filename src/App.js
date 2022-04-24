import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Nav from './components/nav/nav';
import Home from './components/home/home';
import Orders from './components/orders/orders';
import OrderDetail from './components/orders/order_detail';
import MenuManager from './components/products/menu_manager/menu_manager';
import NewProduct from './components/products/product_manager/product_manager';
import ManageCategory from './components/products/category_manager/category_manager';
import ManagePreference from './components/products/preference_manager/preference_manager';
import Messages from './components/messages/messages';
import RecentComments from './components/comments/recent_comments';
import Users from './components/user/users';
import UserDetail from './components/user/user_detail';
import DpManager from './components/user/dp_manager';
import Coupons from './components/coupons/coupons';


function App() {
  return (
    <BrowserRouter>
      <Nav /> 
      <Switch>
        <Route exact path="/" component={()=><Home />} />
        <Route exact path="/orders" component={()=><Orders />} />
        <Route exact path="/orders/order_detail" component={()=><OrderDetail />} />
        <Route exact path="/recent_comments" component={()=><RecentComments />} />
        <Route exact path="/menu_manager" component={()=><MenuManager />} />
        <Route exact path="/menu_manager/new_product" component={()=><NewProduct newProd={true} />} />
        <Route exact path="/menu_manager/edit_product/:prodName" component={()=><NewProduct newProd={false} />} />
        <Route exact path="/menu_manager/manage_categories" component={()=><ManageCategory />} />
        <Route exact path="/menu_manager/manage_preferences" component={()=><ManagePreference />} />
        <Route exact path="/messages" component={()=><Messages />} />
        <Route exact path="/users" component={()=><Users />} />
        <Route exact path="/user/:userId" component={()=><UserDetail />} />
        <Route exact path="/dp_manager" component={()=><DpManager />} />
        <Route exact path="/coupons" component={()=><Coupons />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
