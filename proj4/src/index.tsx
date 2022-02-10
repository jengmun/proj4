import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/main";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// import reportWebVitals from "./reportWebVitals";

const theme = createTheme({
  palette: {
    primary: { main: "#a5a58d" },
    secondary: { main: "#cb997e" },
    warning: { main: "#b5838d" },
  },
  typography: {
    h2: {
      fontSize: "2vw",
      letterSpacing: "5px",
      fontWeight: "400",
    },
    h3: {
      fontSize: "1.5vw",
      letterSpacing: "2px",
    },
    h4: {
      fontSize: "1.3vw",
      letterSpacing: "2px",
    },
    h5: {
      fontSize: "1vw",
      letterSpacing: "1.5px",
    },
    h6: {
      fontSize: "0.8vw",
      letterSpacing: "1.2px",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
