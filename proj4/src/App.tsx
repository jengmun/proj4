import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import Overview from "./pages/Shop/Overview";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import Account from "./pages/Account/Account";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

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
        <Route path="/account" component={Account} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/login" component={Login} />

        <Route path="/admin" component={Admin} />
      </Switch>
    </div>
  );
}

export default App;
