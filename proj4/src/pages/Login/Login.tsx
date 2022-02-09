import { useState } from "react";
import axios from "axios";
import { loginType } from "../../types/types";
import { useDispatch } from "react-redux";
import { login } from "../../store/user";
import {
  Button,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
            `http://localhost:8000/user/get-account-details/${loginDetails.email}/`,
            { headers: { Authorization: `Bearer ${token.data.access}` } }
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
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "secondary.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#e1c0c0",
          height: "60%",
          width: "25%",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 5 }}>
          WELCOME BACK!
        </Typography>
        <TextField
          required
          sx={{ m: "1rem", ml: 5, mr: 5 }}
          size="medium"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setLoginDetails({ ...loginDetails, email: e.target.value });
          }}
        />
        <TextField
          required
          sx={{ margin: "1rem", ml: 5, mr: 5 }}
          size="medium"
          label="Password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setLoginDetails({ ...loginDetails, password: e.target.value });
          }}
        />

        <Button
          sx={{ margin: "1rem", ml: 5, mr: 5 }}
          variant="contained"
          color="primary"
          onClick={() => {
            handleLogin(loginDetails);
          }}
        >
          Login
        </Button>
      </Box>
      <Box
        sx={{
          height: "60%",
          width: "25%",
          backgroundImage:
            "url(https://images.iphotography.com/wp-content/uploads/2019/08/06103133/101-1.jpg)",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <Button
            sx={{
              backgroundColor: "rgba(0,0,0,0)",
              boxShadow: "none",
              border: "1px solid white",
            }}
            variant="contained"
            onClick={() => history.push("/createaccount")}
          >
            <Typography variant="h5">Create Account</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
