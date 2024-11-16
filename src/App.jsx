import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
