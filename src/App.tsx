import { CircularProgress } from "@mui/material";
import "./App.css";
import { useIsAuthenticated } from "./hooks/useAuth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes.tsx";
import { Row } from "./ui/Row.tsx";

const router = createBrowserRouter(routes);

export function App() {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }
  return <RouterProvider router={router} />;
}
