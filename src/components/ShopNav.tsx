import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { logout } from "../store/user";
import { Grid, List, ListItem, Typography } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";

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
            <Typography variant="h5">HOME</Typography>
          </ListItem>

          <ListItem
            sx={{ flex: 0, cursor: "pointer" }}
            onClick={() => {
              history.push("/shop");
            }}
          >
            <Typography variant="h5">SHOP</Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={2} sx={{ textAlign: "center" }}>
        <img
          style={{
            cursor: "pointer",
            width: "11vw",
          }}
          onClick={() => {
            history.push("/");
          }}
          src="https://see.fontimg.com/api/renderfont4/519DV/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/U0tPT0I/better-grade.png"
          alt="logo"
        />
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
              <Typography variant="h5">
                <ShoppingCartOutlined />
              </Typography>
            </ListItem>
          )}
          {email && (
            <ListItem
              sx={{ flex: 0, cursor: "pointer" }}
              onClick={() => history.push("/account")}
            >
              <Typography variant="h5">ORDERS</Typography>
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
              <Typography variant="h5">LOG OUT</Typography>
            </ListItem>
          ) : (
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => history.push("/login")}
            >
              <Typography variant="h5">LOGIN</Typography>
            </ListItem>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default ShopNav;
