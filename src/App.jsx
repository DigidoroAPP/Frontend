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
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path={VIEWS.home} element={<Home />} />
              <Route path={VIEWS.login} element={<Login />} />
              <Route path={VIEWS.register} element={<Register />} />
              <Route path={VIEWS.securityHome} element={<ProtectedHome />} />
              <Route path={VIEWS.tasks} element={<TaskPage />} />
            </Routes>

            <CssBaseline />
            <Toaster position="top-right" />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
