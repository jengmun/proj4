import { Route, Switch } from "react-router-dom";
import ShopNav from "./ShopNav";
import AdminNav from "./AdminNav";

const Nav = () => {
  return (
    <div>
      <Switch>
        <Route path="/admin" component={AdminNav} />
        <Route path="/" component={ShopNav} />
      </Switch>
    </div>
  );
};

export default Nav;
