import { Route, Switch, Redirect } from "react-router-dom";
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
import AdminLogin from "./pages/Admin/AdminLogin";
import Admin from "./pages/Admin/Admin";
import Payment from "./pages/CheckOut/Payment";
import { useAppSelector } from "./store/hooks";

function App() {
  const admin = useAppSelector((state) => state.admin.email);
  const user = useAppSelector((state) => state.user.email);

  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Overview} />
        <Route path="/shop/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={CheckOut} />
        <Route path="/payment" component={Payment} />
        <Route path="/account" component={Account} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/login">
          {user ? <Redirect to="/shop" /> : <Login />}
        </Route>

        <Route exact path="/admin">
          {admin ? <Redirect to="/admin/dashboard" /> : <AdminLogin />}
        </Route>
        <Route path="/admin/dashboard" component={Admin} />
      </Switch>
    </>
  );
}

export default App;
