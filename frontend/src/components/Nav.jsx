import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout";
import { AuthContext } from "./Auth";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart/Cart";
import Product from "../Pages/AddProduct.js/Product";
import CreateUser from "../Pages/CreateUser";
import Checkout from "../Pages/Checkout/Checkout";
import AdminPage from "../Pages/Admin/AdminPage";
import CreateProduct from "../Pages/Admin/CreateProduct";
import RemoveProduct from "../Pages/Admin/RemoveProduct";
import OrdersPage from "../Pages/Admin/OrdersPage";
import AdminLogin from "../Pages/Admin/AdminLogin";

function RouteWrapper({ component: Component, TransparentNav, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props} TransparentNav={TransparentNav}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

function Nav() {
  const { isLoggedIn, userData } = useContext(AuthContext);

  return (
    <BrowserRouter baseName="/">
      <Switch>
        {console.log("isloggedin", isLoggedIn)}
        {isLoggedIn ? (
          <React.Fragment>
            {console.log("true")}
            <RouteWrapper path="/home" exact component={Home} />
            <RouteWrapper path="/" exact component={Home} />
            <RouteWrapper path="/cart" exact component={Cart} />
            <RouteWrapper path="/shopping" exact component={Product} />
            <RouteWrapper path="/checkout" exact component={Checkout} />
            <RouteWrapper path="/admin" exact component={AdminPage} />
            <RouteWrapper path="/create-product" exact component={CreateProduct} />
            <RouteWrapper path="/remove-product" exact component={RemoveProduct} />
            <RouteWrapper path="/add-employee" exact component={CreateUser} />
            <RouteWrapper path="/orders" exact component={OrdersPage} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <RouteWrapper path="/" exact component={Login} />
            <RouteWrapper path="/admin-login" exact component={AdminLogin} />
            <RouteWrapper path="/add-employee" exact component={CreateUser} />
          </React.Fragment>
        )}

        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Nav;
