import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedHome from "./pages/home/ProtectedHome";
import { VIEWS } from "./lib/views";
import TaskPage from "./pages/task/TaskPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path={VIEWS.home} element={<Home />} />
              <Route path={VIEWS.login} element={<Login />} />
              <Route path={VIEWS.register} element={<Register />} />
              <Route path={VIEWS.securityHome} element={<ProtectedHome />} />
              <Route path={VIEWS.tasks} element={<TaskPage />} />
            </Routes>

            <CssBaseline />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
export default App;
