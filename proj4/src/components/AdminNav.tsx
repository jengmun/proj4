import { useHistory } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useDispatch } from "react-redux";
import { logout } from "../store/admin";
import { Typography, Box } from "@mui/material";

const AdminNav = () => {
  const firstName = useAppSelector((state) => state.admin.firstName);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Box
      style={{
        backgroundColor: "#1c1c1c",
        width: "10%",
        height: "100%",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      }}
    >
      {firstName && (
        <>
          <Box sx={{ mt: "2rem", mb: "30vh" }}>
            <Typography
              variant="h5"
              sx={{
                background: "linear-gradient(135deg, #f16998, #f5cb75)",
                backgroundClip: "text",
                color: "transparent",
                textAlign: "center",
              }}
            >
              WELCOME
            </Typography>
            <Typography
              variant="h4"
              sx={{
                background: "linear-gradient(135deg, #db4ee3, #3022ae)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {firstName}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            onClick={() => {
              history.push("/admin/dashboard");
            }}
            sx={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #f16998, #f5cb75)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            DASHBOARD
          </Typography>
        </>
      )}
      {firstName ? (
        <Typography
          variant="h5"
          onClick={() => {
            dispatch(logout());
            history.push("/admin");
          }}
          sx={{
            cursor: "pointer",
            background: "linear-gradient(135deg, #f16998, #f5cb75)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          LOG OUT
        </Typography>
      ) : (
        <Typography
          variant="h5"
          onClick={() => {
            history.push("/admin");
          }}
          sx={{
            mt: "40vh",
            cursor: "pointer",
            background: "linear-gradient(135deg, #f16998, #f5cb75)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          LOG IN
        </Typography>
      )}
    </Box>
  );
};

export default AdminNav;
