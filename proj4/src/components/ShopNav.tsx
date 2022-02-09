import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { logout } from "../store/user";
import { Grid, List, ListItem, Typography } from "@mui/material";

const ShopNav = () => {
  const dispatch = useDispatch();
  const email = useAppSelector((state) => state.user.email);
  const history = useHistory();

  return (
    <Grid
      container
      sx={{
        position: "absolute",
        top: "1rem",
        height: "max-content",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Grid item xs={5}>
        <List
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ListItem
            sx={{ flex: 0, cursor: "pointer" }}
            onClick={() => {
              history.push("/");
            }}
          >
            <Typography variant="h6">HOME</Typography>
          </ListItem>

          <ListItem
            sx={{ flex: 0, cursor: "pointer" }}
            onClick={() => {
              history.push("/shop");
            }}
          >
            <Typography variant="h6">SHOP</Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={2}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/");
          }}
          variant="h2"
        >
          SKOOB
        </Typography>
      </Grid>

      <Grid item xs={5}>
        <List
          sx={{
            display: "flex",
          }}
        >
          {email && (
            <ListItem
              sx={{ flex: 0, cursor: "pointer" }}
              onClick={() => history.push("/cart")}
            >
              <Typography variant="body1">CART</Typography>
            </ListItem>
          )}
          {email && (
            <ListItem
              sx={{ flex: 0, cursor: "pointer" }}
              onClick={() => history.push("/account")}
            >
              <Typography variant="body1">ACCOUNT</Typography>
            </ListItem>
          )}
          {email ? (
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(logout());
                history.push("/");
              }}
            >
              <Typography variant="body1">LOG OUT</Typography>
            </ListItem>
          ) : (
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => history.push("/login")}
            >
              <Typography variant="body1">LOGIN</Typography>
            </ListItem>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default ShopNav;
