import { Box, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box sx={{ height: "calc(100vh - 150px)" }}>
      <Box
        sx={{
          marginTop: "150px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "url(https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg)",
        }}
      >
        <Box sx={{ backgroundColor: "rgba(0,0,0,0.6)", p: 5 }}>
          <Typography variant="h2" sx={{ color: "white" }}>
            WELCOME TO SKOOB
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
