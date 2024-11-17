import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
