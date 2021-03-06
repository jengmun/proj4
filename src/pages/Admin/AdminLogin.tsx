import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { loginType } from "../../types/types";
import { useDispatch } from "react-redux";
import { login } from "../../store/admin";
import {
  Button,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loginDetails, setLoginDetails] = useState<loginType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = (loginDetails: loginType) => {
    setError("");
    axios
      .post("https://morning-reaches-28938.herokuapp.com/user/admin-login/", {
        email: loginDetails.email,
        password: loginDetails.password,
      })
      .then((token) => {
        token.data.access
          ? axios
              .get(
                `https://morning-reaches-28938.herokuapp.com/user/get-account-details/${loginDetails.email}/`,
                { headers: { Authorization: `Bearer ${token.data.access}` } }
              )
              .then((details) => {
                dispatch(
                  login({
                    email: loginDetails.email,
                    firstName: details.data.first_name,
                    lastName: details.data.last_name,
                    token: token.data,
                    id: details.data.id,
                  })
                );
              })
          : setError(token.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f16998, #02a5e9)",
        height: "100vh",
      }}
    >
      <Button
        sx={{ position: "absolute", top: 5, left: "10%" }}
        onClick={() => {
          history.push("/");
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          BACK
        </Typography>
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "20px",
          backgroundColor: "#f8eeff80",
          height: "fit-content",
          width: "20%",
          p: 5,
        }}
      >
        <Typography
          variant="h4"
          sx={{ p: 2, textAlign: "center", color: "white" }}
        >
          SIGN IN
        </Typography>
        <TextField
          required
          sx={{ margin: "1rem" }}
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
          sx={{ margin: "1rem" }}
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
          sx={{
            margin: "1rem",
            background: "linear-gradient(135deg, #f16998, #02a5e9)",
          }}
          variant="contained"
          color="primary"
          onClick={() => {
            handleLogin(loginDetails);
          }}
        >
          Login
        </Button>
        <Typography variant="h6" sx={{ textAlign: "center", color: "maroon" }}>
          {error}
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminLogin;
