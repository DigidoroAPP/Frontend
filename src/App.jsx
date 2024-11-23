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
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path={VIEWS.login} element={<Login />} />
              <Route path={VIEWS.register} element={<Register />} />
              <Route path="*" element={<NotFoundPage />} />

              {/* Rutas publicas para usuarios logeados */}
              <Route element={<ProtectedRoute />}>
                <Route path={VIEWS.securityHome} element={<ProtectedHome />} />
                <Route path={VIEWS.tasks} element={<TaskPage />} />
              </Route>
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
