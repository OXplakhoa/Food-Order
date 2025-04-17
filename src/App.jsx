import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./route/Home";
import AuthForm from "./components/auth/AuthForm";
import authAction from "./components/auth/authAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthForm />,
    action: authAction, // 👈 Thêm action ở đây
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
