import { createBrowserRouter } from "react-router-dom";
import UserPage from "../components/UserPage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/users/:userId", element: <UserPage /> },
]);

export default router;
