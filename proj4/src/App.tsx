import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import Overview from "./pages/Shop/Overview";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Overview} />
        <Route path="/shop/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={CheckOut} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
