import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { loginType } from "../../types/types";
import { useDispatch } from "react-redux";
import { login } from "../../store/user";

const Login = () => {
  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState<loginType>({
    email: "",
    password: "",
  });

  const handleLogin = (loginDetails: loginType) => {
    axios
      .post("http://localhost:8000/user/login/", {
        email: loginDetails.email,
        password: loginDetails.password,
      })
      .then((token) => {
        axios
          .get(
            `http://localhost:8000/user/get-account-details/${loginDetails.email}`,
            { headers: { Authorization: `Bearer: ${token.data.access}` } }
          )
          .then((details) => {
            dispatch(
              login({
                email: loginDetails.email,
                token: token.data,
                id: details.data.id,
              })
            );
          });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        onChange={(e) => {
          setLoginDetails({ ...loginDetails, email: e.target.value });
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={(e) => {
          setLoginDetails({ ...loginDetails, password: e.target.value });
        }}
      />
      <button
        onClick={() => {
          console.log(loginDetails);
          handleLogin(loginDetails);
        }}
      >
        Login
      </button>

      <NavLink to="/createaccount">
        <button>Create Account</button>
      </NavLink>
    </div>
  );
};

export default Login;
