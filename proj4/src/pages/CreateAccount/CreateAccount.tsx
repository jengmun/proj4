import { useState } from "react";
import axios from "axios";
import { accountType } from "../../types/types";

const CreateAccount = () => {
  const [accountDetails, setAccountDetails] = useState<accountType>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    password: "",
  });

  const handleCreateAccount = (accountDetails: accountType) => {
    axios
      .post("http://localhost:8000/user/create-account/", {
        email: accountDetails.email,
        firstName: accountDetails.firstName,
        lastName: accountDetails.lastName,
        address: accountDetails.address,
        postalCode: accountDetails.postalCode,
        password: accountDetails.password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        onChange={(e) => {
          setAccountDetails({ ...accountDetails, email: e.target.value });
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={(e) => {
          setAccountDetails({ ...accountDetails, password: e.target.value });
        }}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        onChange={(e) => {
          setAccountDetails({ ...accountDetails, firstName: e.target.value });
        }}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        onChange={(e) => {
          setAccountDetails({ ...accountDetails, lastName: e.target.value });
        }}
      />
      <label htmlFor="address">Address</label>
      <input
        id="address"
        onChange={(e) => {
          setAccountDetails({ ...accountDetails, address: e.target.value });
        }}
      />
      <label htmlFor="postalCode">Postal Code</label>
      <input
        id="postalCode"
        onChange={(e) => {
          setAccountDetails({ ...accountDetails, postalCode: e.target.value });
        }}
      />
      <button
        onClick={() => {
          console.log(accountDetails);
          handleCreateAccount(accountDetails);
        }}
      >
        Create Account
      </button>
    </div>
  );
};

export default CreateAccount;
