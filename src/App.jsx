import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedHome from "./pages/home/ProtectedHome";
import { VIEWS } from "./lib/views";
import TaskPage from "./pages/task/TaskPage";
import { Pomodoro } from "./pages/pomodoro/Pomodoro";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";

const AppLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Toaster position="top-right" />
        <Outlet />
      </AuthProvider>
    </ThemeProvider>
  );
};

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Layout principal
    children: [
      { path: VIEWS.login, element: <Login /> },
      { path: VIEWS.register, element: <Register /> },
      { path: "*", element: <NotFoundPage /> },

      // Rutas protegidas
      {
        element: <ProtectedLayout />,
        children: [
          { path: VIEWS.securityHome, element: <ProtectedHome /> },
          { path: VIEWS.tasks, element: <TaskPage /> },
          { path: VIEWS.pomodoro, element: <Pomodoro /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

/* 
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

              {/* Rutas publicas para usuarios logeados }
              <Route element={<ProtectedRoute />}>
                <Route path={VIEWS.securityHome} element={<ProtectedHome />} />
                <Route path={VIEWS.tasks} element={<TaskPage />} />
                <Route path={VIEWS.pomodoro} element={<Pomodoro />} />
              </Route>
            </Routes>

            <CssBaseline />
            <Toaster position="top-right" />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
} */
export default App;
