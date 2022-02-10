import { useState } from "react";
import axios from "axios";
import { accountType } from "../../types/types";
import {
  TextField,
  Button,
  Box,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";

const CreateAccount = () => {
  const [accountDetails, setAccountDetails] = useState<accountType>({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    postal_code: "",
    password: "",
  });
  const [open, setOpen] = useState(false);

  const handleCreateAccount = (accountDetails: accountType) => {
    axios
      .post("http://localhost:8000/user/create-account/", {
        email: accountDetails.email,
        first_name: accountDetails.first_name,
        last_name: accountDetails.last_name,
        address: accountDetails.address,
        postal_code: accountDetails.postal_code,
        password: accountDetails.password,
      })
      .then((response) => {
        setOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setOpen(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "linear-gradient(135deg, #ede0d4, #C09F80)",
      }}
    >
      <Box
        sx={{
          mt: "10vh",
          display: "grid",
          gap: 1,
          gridTemplateAreas: `"title title"
          "email password"
          "fn ln"
          "address address" 
          "postal ."
          "submit submit"`,
          width: "30%",
          border: "1px solid black",
          borderRadius: "50px",
          padding: "clamp(2px, 5vh, 30px)",
          bgcolor: "#D7CEC7",
          boxShadow: "2px 2px 10px #565656",
        }}
      >
        <Box
          style={{
            gridArea: "title",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3">SIGN UP</Typography>
        </Box>
        <TextField
          required
          label="Email"
          variant="standard"
          sx={{ m: "1vh", gridArea: "email" }}
          inputProps={{ style: { padding: "clamp(2px, 1.5vh, 20px)" } }}
          onChange={(e) => {
            setAccountDetails({ ...accountDetails, email: e.target.value });
          }}
        />
        <TextField
          required
          label="Password"
          variant="standard"
          type="password"
          sx={{ m: "1vh", gridArea: "password" }}
          inputProps={{ style: { padding: "clamp(2px, 1.5vh, 20px)" } }}
          onChange={(e) => {
            setAccountDetails({ ...accountDetails, password: e.target.value });
          }}
        />
        <TextField
          required
          label="First Name"
          variant="standard"
          sx={{ m: "1vh", gridArea: "fn" }}
          inputProps={{ style: { padding: "clamp(2px, 1.5vh, 20px)" } }}
          onChange={(e) => {
            setAccountDetails({
              ...accountDetails,
              first_name: e.target.value,
            });
          }}
        />
        <TextField
          required
          label="Last Name"
          variant="standard"
          sx={{ m: "1vh", gridArea: "ln" }}
          inputProps={{ style: { padding: "clamp(2px, 1.5vh, 20px)" } }}
          onChange={(e) => {
            setAccountDetails({ ...accountDetails, last_name: e.target.value });
          }}
        />
        <TextField
          required
          label="Address"
          variant="standard"
          sx={{ m: "1vh", gridArea: "address" }}
          inputProps={{ style: { padding: "clamp(2px, 1.5vh, 20px)" } }}
          onChange={(e) => {
            setAccountDetails({ ...accountDetails, address: e.target.value });
          }}
        />
        <TextField
          required
          label="Postal Code"
          variant="standard"
          sx={{ m: "1vh", gridArea: "postal" }}
          inputProps={{ style: { padding: "clamp(2px, 1.5vh, 20px)" } }}
          onChange={(e) => {
            setAccountDetails({
              ...accountDetails,
              postal_code: e.target.value,
            });
          }}
        />
        <Button
          sx={{ m: 2, gridArea: "submit" }}
          variant="contained"
          onClick={() => {
            console.log(accountDetails);
            handleCreateAccount(accountDetails);
          }}
        >
          Create Account
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <SnackbarContent
          sx={{ justifyContent: "center" }}
          message="Account created!"
        />
      </Snackbar>
    </Box>
  );
};

export default CreateAccount;
