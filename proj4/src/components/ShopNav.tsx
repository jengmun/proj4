import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { logout } from "../store/user";

const ShopNav = () => {
  const dispatch = useDispatch();
  const email = useAppSelector((state) => state.user.email);

  return (
    <div>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/shop">
          <li>Shop</li>
        </NavLink>
        {email && (
          <NavLink to="/cart">
            <li>Cart</li>
          </NavLink>
        )}
        {email && (
          <NavLink to="/account">
            <li>Account</li>
          </NavLink>
        )}
        {email ? (
          <li onClick={() => dispatch(logout())}>Logout</li>
        ) : (
          <NavLink to="/login">
            <li>Login</li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default ShopNav;